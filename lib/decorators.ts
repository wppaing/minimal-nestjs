import {
  CONTROLLER_KEY,
  CONTROLLER_PATH_KEY,
  CONTROLLER_PREFIX_KEY,
  HTTP_METHOD_KEY,
  PROVIDER_KEY,
} from "./constants";
import { ModuleMetadata, RequestMethod } from "./interfaces";

export function Injectable(): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(PROVIDER_KEY, true, target);
  };
}

export function Controller(prefix?: string): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(CONTROLLER_PREFIX_KEY, prefix ?? "", target);
  };
}

export function Module({
  controllers,
  providers,
}: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(CONTROLLER_KEY, controllers, target);
    Reflect.defineMetadata(PROVIDER_KEY, providers, target);
  };
}

function createMappingDecorator(
  method: RequestMethod,
  path?: string
): MethodDecorator {
  return (target: object, key: string | symbol) => {
    Reflect.defineMetadata(HTTP_METHOD_KEY, method, target, key);
    Reflect.defineMetadata(CONTROLLER_PATH_KEY, path ?? "", target, key);
  };
}

export const Get = (path?: string) =>
  createMappingDecorator(RequestMethod.GET, path);

export const Post = (path?: string) =>
  createMappingDecorator(RequestMethod.POST, path);
