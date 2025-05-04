import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET = "" } = process.env;

interface Payload {
  id: string;
  rol: string;
}

export class encrypt {
  static async encryptPass(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static comparePassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}