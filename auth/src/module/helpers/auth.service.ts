import jwt from "jwt-simple";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export class AuthService {

  public generateAccessToken(name: string, id: string): string {
    const payload = {
      id,
      name,
      iat: moment().unix(),
      exp: moment().add(30, "minutes").unix(),
    };

    return jwt.encode(
      payload,
      process.env.TOKEN_SECRET || "85b34edf-a256-42c3-a35a-750fcb21e090"
    );
  }

  public generateRefreshToken(): string {
    return uuidv4();
  }

  public validateAccessToken(accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(
          accessToken,
          process.env.TOKEN_SECRET || "85b34edf-a256-42c3-a35a-750fcb21e090"
        );
        if (payload.exp <= moment().unix()) {
          reject(new Error("Token expired"));
        }
        resolve(payload);
      } catch (err) {
        reject(err);
      }
    });
  }
}
