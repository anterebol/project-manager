import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BoardsModule } from './resources/boards/boards.module';
import { ColumnsModule } from './resources/columns/columns.module';
import { FileModule } from './resources/file/files.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      url: process.env.TYPEORM_URL,
      port: 5432,
      entities: [`${__dirname  }dist/**/*.entity{.ts,.js}`],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    // LoggerModule,
    UsersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
