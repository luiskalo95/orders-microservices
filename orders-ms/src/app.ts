import express, { Application, Request, Response } from "express";
import Router from "./module/infrastructure/http/order.route";
class App {

  public expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
  }

  public middlewares(): void {
    this.expressApp.use(express.json());
  }

  public mountRoutes(): void {
    this.expressApp.use("/order", Router);
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().expressApp;
