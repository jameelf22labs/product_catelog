import { Injectable } from '@nestjs/common';
import { Product } from './entity/Product.model';
import { ProductQueryParams } from './dto/QueryParams';
import { Op, where } from 'sequelize';
import { Category } from './entity/Category.model';
import { Brands } from './entity/Brands.model';
import { Colors } from './entity/Color.model';
import { Size } from './entity/Size.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductService {
  public constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  getProducts(filter: ProductQueryParams): Promise<Product[]> {
    const { page, limit, filters } = filter;
    const offset = (page - 1) * limit;

    const {
      category,
      brand,
      color,
      size,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      orderBy,
    } = filters;

    const productWhereContition: any = {};
    if (minPrice) productWhereContition.price = { [Op.gte]: minPrice };
    if (maxPrice)
      productWhereContition.price = {
        ...(productWhereContition.price || {}),
        [Op.lte]: maxPrice,
      };

    const products = this.productModel.findAll({
      where: productWhereContition,

      include: [
        {
          model: Category,
          ...(category && { where: { name: category } }),
        },

        {
          model: Brands,
          ...(brand && { where: { name: brand } }),
        },

        {
          model: Colors,
          through: { attributes: [] },
          ...(color && { where: { name: color } }),
        },

        {
          model: Size,
          through: { attributes: [] },
          ...(size && { where: { value: size } }),
        },
      ],

      order: [[sortBy || 'createdAt', (orderBy || 'asc').toUpperCase()]],
      limit,
      offset,
    });

    return products;
  }
}
