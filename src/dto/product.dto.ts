import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class ProductDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name: string;

  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  description: string;

  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  price: number;

  @IsNotEmpty({ message: "Stock is required" })
  @IsNumber({}, { message: "Stock must be a number" })
  @IsPositive({ message: "Stock must be a positive number" })
  stock: number;

  @IsNotEmpty({ message: "Category is required" })
  @IsString({ message: "Category must be a string" })
  category: string;

  @IsNotEmpty({ message: "Image URL is required" })
  @IsString({ message: "Image URL must be a string" })
  imageUrl: string;
}
