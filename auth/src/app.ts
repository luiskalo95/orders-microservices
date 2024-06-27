import express, { Application, Request, Response } from "express";
import RouterAuth from "./module/infrastructure/http/auth.route";
import { HandlerErrors } from './module/helpers/errors.helper';
class App {
  
  public expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  public middlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  public mountRoutes(): void {
    this.expressApp.use("/auth", RouterAuth);
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }

  public mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
    this.expressApp.use(HandlerErrors.generic);
  }
}

export default new App().expressApp;
