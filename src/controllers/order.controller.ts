import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { validateDto } from "../helpers/validateDto";
import { OrderDto } from "../dto/order.dto";

export class OrderController {
  static async save(req: Request, res: Response) {
    const dto = await validateDto(OrderDto, req.body, res);
    if (!dto) return;
    const { userId, products } = dto;

    try {
      const order = await OrderService.save(userId, products);
      res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ message: error.message });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await OrderService.findOne(id);
      if (!order) res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAll(req: Request, res: Response) {
    const currentUser = global.currentUser;
    console.log("currentUser",currentUser);
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId, rol: role } = currentUser;

    try {
      const orders = await OrderService.findAll(userId as string, role as string);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(400).json({ message: error.message });
    }
  }
}