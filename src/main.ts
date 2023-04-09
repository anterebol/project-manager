import { NestFactory } from '@nestjs/core';
import cors = require("cors");
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const {PORT} = process.env
  app.use(cors({
    origin: '*'
  }))
  app.listen(PORT || 4000, ()=> {
    console.log(`Server listening on port ${PORT}`);
  });
}
bootstrap();

