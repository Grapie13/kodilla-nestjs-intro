import { Tag } from '../enums/tag.enum';

export class UpdateProductDto {
  name?: string;
  price?: number;
  count?: number;
  tags?: Tag[];
}
