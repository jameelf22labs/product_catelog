import { Table, Column, DataType, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'rating_details' })
export class Rating extends Model<Rating> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    field: 'product_id',
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.STRING,
    field: 'product_rating',
  })
  value: string;
}
