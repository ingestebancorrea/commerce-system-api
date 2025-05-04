import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class AuthService {
  static async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await encrypt.comparePassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = encrypt.generateToken({ id: user.id, rol: user.role });
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
