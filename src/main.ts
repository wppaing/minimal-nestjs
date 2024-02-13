import { createApp } from "../lib";
import { AppModule } from "./app.module";

function bootstrap() {
  const app = createApp(AppModule);

  app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
  });
}

bootstrap();
