import { Tag } from '../enums/tag.enum';

export class CreateProductDto {
  name: string;
  price: number;
  count: number;
  tags: Tag[];
}
