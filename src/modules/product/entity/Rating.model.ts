import { Model } from 'sequelize';
import { Column, DataType, Default, PrimaryKey } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

export class Rating extends Model<Rating> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  productId: string;

  @Column({
    type: DataType.STRING,
    field: 'product_rating',
  })
  value: string;
}
