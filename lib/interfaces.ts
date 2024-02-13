interface ClassType extends Function {}

export interface ModuleMetadata {
  controllers?: ClassType[];
  providers?: ClassType[];
}

export enum RequestMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  ALL = "all",
  OPTIONS = "options",
  HEAD = "head",
  SEARCH = "search",
}
