import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserSignUpDto } from "../dto/user-signup.dto";
import { validateDto } from "../helpers/validateDto";

export class UserController {
  static async signUp(req: Request, res: Response) {
    const dto = await validateDto(UserSignUpDto, req.body, res);
    if (!dto) return;
    
    try {
      const { name, email, password, role } = dto;
      const { user, token } = await UserService.signUp(name, email, password, role);

      res.status(200).json({
        message: "User created successfully",
        user,
        token,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({ message: error.message });
    }
  }
}
