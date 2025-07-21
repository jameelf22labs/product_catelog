import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './Product.model';

@Table({ tableName: 'rating_details' })
export class Rating extends Model<Rating> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  value: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'product_id',
  })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}
