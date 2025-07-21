import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Size } from './Size.model';
import { Product } from './Product.model';

@Table({ tableName : 'product_size_details' })
export class ProductSize extends Model<ProductSize> {
  @ForeignKey(() => Size)
  @Column({
    type: DataType.UUID,
    field: 'size_id',
  })
  sizeId: string;

  @Column({
    type: DataType.UUID,
    field: 'product_id',
  })
  @ForeignKey(() => Product)
  productId: string;
}
