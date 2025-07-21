import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './Category.model';
import { Brands } from './Brands.model';
import { Colors } from './Color.model';
import { ProductColor } from './ProductColor.model';
import { Size } from './Size.model';
import { ProductSize } from './ProductSize.model';

@Table({ tableName: 'productdetails' })
export class Product extends Model<Product> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'image_url',
  })
  imageUrl: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'stock_quantity',
  })
  stockQuantity: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    field: 'category_id',
    allowNull: false,
  })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Brands)
  @Column({
    type: DataType.UUID,
    field: 'brand_id',
    allowNull: false,
  })
  brandId: string;

  @BelongsTo(() => Brands)
  brand: Brands;

  @BelongsToMany(() => Colors, () => ProductColor)
  colors: Colors[];

  @BelongsToMany(() => Size, () => ProductSize)
  size: Size[];
}
