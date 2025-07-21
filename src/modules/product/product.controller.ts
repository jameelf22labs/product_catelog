import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductFilterParams } from './dto/QueryParams';
import { QueryDecodeHelper } from '../common';
import { Throttle } from '@nestjs/throttler';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  public constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async getProducts(
    @Query('f') filter: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const cacheKey = `products:${filter}:${page}:${limit}`;
    this.logger.debug(`Fetching products with cacheKey: ${cacheKey}`);

    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      this.logger.log(`Cache hit for ${cacheKey}`);
      return cached;
    }

    const queryParamObj = QueryDecodeHelper.decode<ProductFilterParams>(
      filter || '',
    );

    const products = await this.productService.getProducts({
      page,
      limit,
      filters: queryParamObj,
    });

    await this.cacheManager.set(cacheKey, products);

    return products;
  }
}
