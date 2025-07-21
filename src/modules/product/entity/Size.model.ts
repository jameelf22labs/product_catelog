import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product.model';
import { ProductSize } from './ProductSize.model';

@Table({ tableName: 'size_details' })
export class Size extends Model<Size> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  value: string;

  @BelongsToMany(() => Product, () => ProductSize)
  product: Product[];
}
