import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthLoginDto } from "../dto/auth-login.dto";
import { validateDto } from "../helpers/validateDto";

export class AuthController {
  static async login(req: Request, res: Response) {
    const dto = await validateDto(AuthLoginDto, req.body, res);
    if (!dto) return;

    try {
      const { username, password } = dto;
      const { user, token } = await AuthService.login(username, password);

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

  static async renewToken(req: Request, res: Response) {
    try {
      const currentUser = global.currentUser;
      const uid = currentUser.id;
      if (!uid) throw new Error("User ID not found in request");
  
      const { user, token } = await AuthService.renewToken(uid);
  
      res.status(200).json({
        message: "Token renew successful",
        user,
        token,
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}
