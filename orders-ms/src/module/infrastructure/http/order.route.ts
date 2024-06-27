import express, { Request, Response } from "express";
import OrderApplication from "../../application/order.application";
import ValidatorHelper from "../../helpers/validator.helper";
import BrokerInfrastructure from "../adapters/broker.infrastructure";
import OrderInfrastructure from "../adapters/order.infrastructure";
import OrderController from "./order.controller";
import { ORDER_INSERT } from "./order.dtos";

const ordenInfrastructure = new OrderInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(ordenInfrastructure);
const application = new OrderApplication(ordenInfrastructure, brokerInfrastructure);
const controller = new OrderController(application);

class RouterOrder {

  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  public mountRoutes(): void {
    this.router.post("/",
      ValidatorHelper.validate(ORDER_INSERT),
      controller.insert
    );
  }
}

export default new RouterOrder().router;
