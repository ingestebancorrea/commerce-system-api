import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class OrderDto {
  @IsNotEmpty({ message: "User ID is required" })
  @IsString({ message: "User ID must be a string" })
  userId: string;

  @IsArray({ message: "Products must be an array" })
  @IsNotEmpty({ each: true, message: "Each product must have productId and quantity" })
  products: { 
    productId: string; 
    quantity: number;
  }[];
}