import { AuthEntity } from "../entities/auth.entity";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default interface AuthRepository {
  getOne(where: object): Promise<AuthEntity>;
  insert(auth: AuthEntity): Promise<void>;
  update(refreshToken: string, newRefreshToken: string): Promise<void>;
}
