import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Colors } from './Color.model';
import { Product } from './Product.model';

@Table({ tableName : 'product_color_details' })
export class ProductColor extends Model<ProductColor> {
  @ForeignKey(() => Colors)
  @Column({
    type: DataType.UUID,
    field: 'color_id',
  })
  colorId: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    field: 'product_id',
  })
  productId: string;
}
