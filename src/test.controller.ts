import { Controller, Get } from "../lib";

@Controller("test")
export class TestController {
  @Get()
  getApp() {
    return "GET test route hit";
  }
}
