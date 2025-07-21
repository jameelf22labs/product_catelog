import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './modules/product/product.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
          name: 'product',
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('POSTGRESS_HOST'),
        port: config.get<number>('POSTGRESS_PORT'),
        username: config.get<string>('POSTGRESS_USERNAME'),
        password: config.get<string>('POSTGRESS_PASSWORD'),
        database: config.get<string>('POSTGRESS_DB'),
        autoLoadModels: true,
        synchronize: false,
        logging: true,
      }),
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {
    this.syncModels();
  }

  async syncModels() {
    await this.sequelize.sync({ alter: true }); 
  }
}
