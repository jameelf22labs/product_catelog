import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : (config : ConfigService) => ({
        dialect : 'postgres',
        host : config.get<string>('POSTGRESS_HOST'),
        port : config.get<number>('POSTGRESS_PORT'),
        username : config.get<string>('POSTGRESS_USERNAME'),
        password : config.get<string>('POSTGRESS_PASSWORD'),
        database : config.get<string>('POSTGRESS_DB'),
        autoLoadModels: true, 
        synchronize: true,
        logging : true
      }),
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
