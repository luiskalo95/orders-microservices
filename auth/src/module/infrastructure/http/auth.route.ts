import express, { Request, Response } from "express";
import AuthApplication from "../../application/auth.application";
import ValidatorHelper from "../../helpers/validator.helper";
import AuthInfrastructure from "../adapters/auth.infrastructure";
import AuthController from "./auth.controller";
import { HandlerErrors } from '../../helpers/errors.helper';
import { REGISTER_USER, LOGIN_USER, NEW_ACCESS_TOKEN_USER, VALIDATE_ACCESS_TOKEN_USER } from './auth.dtos';

const infrastructure = new AuthInfrastructure();
const application = new AuthApplication(infrastructure);
const controller = new AuthController(application);

class RouterAuth {
  
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  public mountRoutes(): void {
    this.router.post("/register", ValidatorHelper.validate(REGISTER_USER), HandlerErrors.catchError(controller.register));
    this.router.post("/login", ValidatorHelper.validate(LOGIN_USER), HandlerErrors.catchError(controller.login));
    this.router.post("/get-new-access-token", ValidatorHelper.validate(NEW_ACCESS_TOKEN_USER),HandlerErrors.catchError(controller.getNewAccessToken));
    this.router.post("/validate-access-token", ValidatorHelper.validate(VALIDATE_ACCESS_TOKEN_USER), HandlerErrors.catchError(controller.validateAccessToken));
  }

}

export default new RouterAuth().router;
