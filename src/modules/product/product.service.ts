import { Injectable } from '@nestjs/common';
import { Product } from './entity/Product.model';
import { col, fn, literal, Op } from 'sequelize';
import { Category } from './entity/Category.model';
import { Brands } from './entity/Brands.model';
import { Colors } from './entity/Color.model';
import { Size } from './entity/Size.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProductQueryParams } from './dto/QueryParams';
import { Rating } from './entity/Rating.model';

@Injectable()
export class ProductService {
  public constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async getProducts(filter: ProductQueryParams): Promise<Product[]> {
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

    const productWhereCondition: any = {};

    if (minPrice) productWhereCondition.price = { [Op.gte]: minPrice };
    if (maxPrice) {
      productWhereCondition.price = {
        ...(productWhereCondition.price || {}),
        [Op.lte]: maxPrice,
      };
    }

    return this.productModel.findAll({
      where: productWhereCondition,
      include: [
        {
          model: Category,
          ...(category && {
            where: { name: { [Op.iLike]: category } },
          }),
        },
        {
          model: Brands,
          ...(brand && {
            where: { name: { [Op.iLike]: brand } },
          }),
        },
        {
          model: Colors,
          through: { attributes: [] },
          ...(color && {
            where: { name: { [Op.iLike]: color } },
          }),
        },
        {
          model: Size,
          through: { attributes: [] },
          ...(size && {
            where: { value: size },
          }),
        },
      ],

      order: [[sortBy || 'createdAt', (orderBy || 'ASC').toUpperCase()]],
      limit,
      offset,
      subQuery: false,
    });
  }
}
