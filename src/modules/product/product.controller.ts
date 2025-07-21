import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductFilterParams } from './dto/QueryParams';
import { QueryDecodeHelper } from '../common';
import { Throttle } from '@nestjs/throttler';

@Controller('product')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Get()
  @Throttle({ default: { limit: 4, ttl: 60 } })
  async getProducts(
    @Query('f') filter: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const queryParamObj = QueryDecodeHelper.decode<ProductFilterParams>(
      filter || '',
    );

    return this.productService.getProducts({
      page: page || 0,
      limit: limit || 10,
      filters: queryParamObj,
    });
  }
}
