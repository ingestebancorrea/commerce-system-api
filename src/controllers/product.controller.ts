import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { validateDto } from "../helpers/validateDto";
import { ProductDto } from "../dto/product.dto";

export class ProductController {
  static async save(req: Request, res: Response) {
    const dto = await validateDto(ProductDto, req.body, res);
    if (!dto) return;

    try {
      const { name, description, price, stock, category, imageUrl } = dto;
      const product = await ProductService.save(name, description, price, stock, category, imageUrl);
      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.findOne(id);
      if (!product) res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const products = await ProductService.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    const dto = await validateDto(ProductDto, req.body, res);
    if (!dto) return;

    try {
      const { id } = req.params;
      const updated = await ProductService.update(id, dto);
      if (!updated) res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product updated", product: updated });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ProductService.delete(id);
      if (!deleted) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}