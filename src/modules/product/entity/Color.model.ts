import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product.model';
import { ProductColor } from './ProductColor.model';

@Table({ tableName: 'color_details' })
export class Colors extends Model<Colors> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => Product , () => ProductColor)
  products : Product[]
}
