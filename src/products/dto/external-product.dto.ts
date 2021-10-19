import { Tag } from '../enums/tag.enum';
import { ProductDto } from './product.dto';

export class ExternalProductDto {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;

  static fromEntity(entity: ProductDto): ExternalProductDto {
    return {
      ...entity,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
