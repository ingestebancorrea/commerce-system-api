import { Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export async function validateDto<T extends object>(dtoClass: new () => T, body: any, res: Response): Promise<T | undefined> {
  try {
    const dto = plainToInstance(dtoClass, body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });
    }

    return dto;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}