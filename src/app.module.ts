import { Get, Module } from "../lib";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TestController } from "./test.controller";

@Module({
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
