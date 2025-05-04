import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class AuthService {
  static async login(username: string, password: string) {
    if (!username || !password) {
      throw new Error("Email and password required");
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email: username } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = encrypt.comparePassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = encrypt.generateToken({ id: user.id, rol: user.role });
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
