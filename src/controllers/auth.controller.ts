import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { validateDto } from "../helpers/validateDto";

export class AuthController {
  static async login(req: Request, res: Response) {
    const dto = await validateDto(AuthLoginDto, req.body, res);
    if (!dto) return;

    try {
      const { email, password } = dto;
      const { user, token } = await AuthService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}
