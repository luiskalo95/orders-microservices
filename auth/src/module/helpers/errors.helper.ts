import { NextFunction, Request, Response } from "express";

export interface IError extends Error {
   status?: number;
}

export class HandlerErrors {

  public static notFound(req: Request, res: Response, next: NextFunction): void {
    const error: Partial<IError> = new Error("Not Found");
    error.status = 404;
    next(error);
  }

  public static catchError(ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await ftn(req, res, next);
      } catch (error) {
        const err: Partial<IError> = new Error("falla intermitente");
        err.message = error.message;
        err.stack = error.stack;
        err.status = 409;
        next(err);
      }
    };
  }

  public static generic(error: IError,req: Request,res: Response,next: NextFunction) {
    const objError: Partial<IError> = {
      name: error.name,
      status: error.status ?? 500,
      message: error.message,
    };
    if (process.env.NODE_ENV !== "production") {
      objError.stack = error.stack;
    }
    return res.status(objError.status).json(objError);
  }
}
