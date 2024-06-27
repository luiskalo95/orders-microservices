import { AuthEntity } from "../../domain/entities/auth.entity";
import AuthRepository from "../../domain/repositories/auth.repository";
import Model from "../models/auth.model";

export default class AuthInfrastructure implements AuthRepository {
  
  public async getOne(where: object): Promise<AuthEntity> {
    return await Model.findOne(where);
  }

  public async insert(auth: AuthEntity): Promise<void> {
    await Model.create(auth);
  }

  public async update(refreshToken: string, newRefreshToken: string) {
    await Model.updateOne({ refreshToken }, { refreshToken: newRefreshToken });
  }
}
