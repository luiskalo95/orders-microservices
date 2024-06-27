import { AuthEntity } from "../domain/entities/auth.entity";
import AuthRepository, { Tokens } from "../domain/repositories/auth.repository";
import * as bcrypt from "bcryptjs";
import { AuthService } from "../helpers/auth.service";

const authService = new AuthService();

export default class AuthApplication {

  private authRepository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.authRepository = repository;
  }

  public async register(auth: AuthEntity): Promise<void> {
    auth.password = await bcrypt.hash(auth.password, 10);
    auth.refreshToken = authService.generateRefreshToken();
    return await this.authRepository.insert(auth);
  }

  public async login(email: string, password: string): Promise<Tokens> {
    const user = await this.authRepository.getOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password incorrect");
    }
    return {
      accessToken: authService.generateAccessToken(user.name, user._id),
      refreshToken: user.refreshToken,
    };
  }

  public async getNewAccessToken(refreshToken: string): Promise<Tokens> {
    const user = await this.authRepository.getOne({ refreshToken });
    if (!user) {
      throw new Error("User not found");
    }

    const newRefreshToken = authService.generateRefreshToken();
    await this.authRepository.update(refreshToken, newRefreshToken);
    return {
      accessToken: authService.generateAccessToken(user.name, user._id),
      refreshToken: newRefreshToken,
    };
  }

  public async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      await authService.validateAccessToken(accessToken);
      return true;
    } catch (err) {
      return false;
    }
  }
}
