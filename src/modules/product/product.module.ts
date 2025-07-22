import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entity/Product.model';
import { Category } from './entity/Category.model';
import { Colors } from './entity/Color.model';
import { Brands } from './entity/Brands.model';
import { Rating } from './entity/Rating.model';
import { Size } from './entity/Size.model';
import { ProductColor } from './entity/ProductColor.model';
import { ProductSize } from './entity/ProductSize.model';
import Media from './entity/Media.model';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      Category,
      Colors,
      Brands,
      Rating,
      Size,
      ProductColor,
      ProductSize,
      Media
    ]),

    CacheModule.register(),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
