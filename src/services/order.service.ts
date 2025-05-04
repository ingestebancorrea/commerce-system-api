import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order.entity";
import { OrderProduct } from "../entity/OrderProduct.entity";
import { Product } from "../entity/Product.entity";
import { User } from "../entity/User.entity";

export class OrderService {
  static async save(userId: string, products: { productId: string; quantity: number }[]) {
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const orderRepository = AppDataSource.getRepository(Order);
    const orderProductRepository = AppDataSource.getRepository(OrderProduct);
  
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error("User not found");
  
    const orderProducts = [];
    let total = 0;
  
    // @INFO calculamos el total sumando los productos
    for (const item of products) {
      const product = await productRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new Error(`Product with ID ${item.productId} not found`);
  
      total += product.price * item.quantity;
  
      const orderProduct = new OrderProduct();
      orderProduct.product = product;
      orderProduct.quantity = item.quantity;
      orderProducts.push(orderProduct);
    }
  
    // @INFO creamos la orden
    const order = new Order();
    order.user = user;
    order.products = orderProducts;
    order.total = total;
  
    // @INFO guardamos la orden
    await orderRepository.save(order);
  
    // @INFO asociamos los productos con la orden (con el orderId)
    for (const orderProduct of orderProducts) {
      orderProduct.order = order;  // Asociamos la orden a cada producto
      await orderProductRepository.save(orderProduct);  // Guardamos el OrderProduct
    }
  
    //@INFO Formateamos la respuesta
    const formattedOrder = {
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
        role: order.user.role,
        createdAt: order.user.createdAt,
        updatedAt: order.user.updatedAt,
      },
      products: order.products.map((orderProduct) => ({
        productId: orderProduct.id,
        name: orderProduct.name,
        description: orderProduct.description,
        price: orderProduct.price
      })),
    };
  
    return formattedOrder;
  }
  
  static async findOne(id: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    return await orderRepository.findOne({ where: { id } });
  }

  static async findAll(userId: string, role: string) {
    const orderRepository = AppDataSource.getRepository(Order);

    if (role === "admin") {
      return await orderRepository.find({
        relations: ["user", "products"]
      });
    } else {
      return await orderRepository.find({
        where: { user: { id: userId } },
        relations: ["user", "products"]
      });
    }
  }
}
