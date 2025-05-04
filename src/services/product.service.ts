import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product.entity";

export class ProductService {
  static async save(name: string, description: string, price: number, stock: number, category: string, imageUrl: string) {
    try {
      const product = new Product();
      product.name = name;
      product.description = description;
      product.price = price;
      product.stock = stock;
      product.category = category;
      product.imageUrl = imageUrl;
  
      const productRepository = AppDataSource.getRepository(Product);
      const savedProduct = await productRepository.save(product);
  
      return savedProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Error creating product: " + error.message);
    }
  }
  
  static async findOne(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOne({ where: { id } });
  }

  static async findAll() {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.find();
  }

  static async update(id: string, data: Partial<Product>) {
    const productRepository = AppDataSource.getRepository(Product);
    try {
      const product = await productRepository.findOne({ where: { id } });
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      Object.assign(product, data);
      return await productRepository.save(product);
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error(error.message || "Error updating product");
    }
  }

  static async delete(id: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new Error("Product not found");
    }

    return await productRepository.remove(product);
  }
}
