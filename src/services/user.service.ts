import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class UserService {
  static async signUp(name: string, email: string, password: string, role: string) {
    const encryptedPassword = await encrypt.encryptPass(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const token = encrypt.generateToken({ id: user.id, rol: user.role });
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }
}
