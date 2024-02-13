import express, { NextFunction, Request, Response } from "express";
import {
  CONTROLLER_KEY,
  CONTROLLER_PATH_KEY,
  CONTROLLER_PREFIX_KEY,
  HTTP_METHOD_KEY,
} from "./constants";

export function createApp(module: any) {
  const app = express();

  const controllers = Reflect.getMetadata(CONTROLLER_KEY, module) || [];
  controllers.forEach((Cls: any) => {
    const controller = new Cls();
    let prefix: string = Reflect.getMetadata(CONTROLLER_PREFIX_KEY, Cls);
    if (prefix) prefix = normalizePath(prefix);

    const routeHandlers =
      Reflect.ownKeys(Cls.prototype).filter((property: string) =>
        Reflect.hasOwnMetadata(HTTP_METHOD_KEY, Cls.prototype, property)
      ) || [];

    routeHandlers.forEach((method: string) => {
      const requestMethod = Reflect.getMetadata(
        HTTP_METHOD_KEY,
        Cls.prototype,
        method
      );
      let path = Reflect.getMetadata(
        CONTROLLER_PATH_KEY,
        Cls.prototype,
        method
      );
      path = normalizePath(path);
      const fullPath = `${prefix}${path}`;
      console.log(`Route mapped: {${fullPath}, ${requestMethod}}`);

      app[requestMethod](
        fullPath,
        async (req: Request, res: Response, next: NextFunction) => {
          const response = await controller[method]();
          res.json(response);
        }
      );
    });
  });

  Reflect.getMetadata(HTTP_METHOD_KEY, module)?.forEach((Cls: Function) => {
    console.log(Cls);
  });

  return app;
}

const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;
