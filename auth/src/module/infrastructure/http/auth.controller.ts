import { Request, Response } from "express";
import AuthApplication from "../../application/auth.application";

export default class AuthController {

  constructor(private application: AuthApplication) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
    this.validateAccessToken = this.validateAccessToken.bind(this);
  }

  public async register(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const auth = req.body;
    await this.application.register(auth);
    return res.send("That's all folks!");
  }

  public async login(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { email, password } = req.body;
    const tokens = await this.application.login(email, password);
    return res.json(tokens);
  }

  public async getNewAccessToken(req: Request, res: Response):Promise<Response<any, Record<string, any>>> {
    const { refreshToken } = req.body;
    const tokens = await this.application.getNewAccessToken(refreshToken);
    return res.json(tokens);
  }

  public async validateAccessToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { accessToken } = req.body;
    const isValid = await this.application.validateAccessToken(accessToken);
    return res.json({ isValid });
  }
}
