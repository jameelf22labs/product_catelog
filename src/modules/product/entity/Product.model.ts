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
import { Category } from './Category.model';
import { Brands } from './Brands.model';
import { Colors } from './Color.model';
import { ProductColor } from './ProductColor.model';
import { Size } from './Size.model';
import { ProductSize } from './ProductSize.model';
import Media from './Media.model';

@Table({ tableName: 'product_details' })
export class Product extends Model<Product> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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

  @ForeignKey(() => Media)
  @Column({
    type: DataType.UUID,
    field: 'media_id',
    allowNull: false,
  })
  mediaId: string;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Media)
  media: Media;

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
