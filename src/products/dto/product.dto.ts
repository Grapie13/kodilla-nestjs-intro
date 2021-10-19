import { Tag } from '../enums/tag.enum';

export class ProductDto {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
