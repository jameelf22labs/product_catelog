import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product.model';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Table({ tableName: 'media_details' })
export default class Media extends Model<Media> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  url: string;

  @Column({
    type: DataType.ENUM(...Object.values(MediaType)),
    field: 'media_type',
  })
  mediaType: string;

  @HasMany(() => Product)
  products: Product[];
}
