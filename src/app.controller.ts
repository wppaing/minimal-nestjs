import { Controller, Get, Post } from "../lib";

@Controller("app")
export class AppController {
  @Get("get")
  getApp() {
    return "This route returns all cats";
  }

  @Post()
  postApp() {
    console.log("POST route hit");
  }
}
