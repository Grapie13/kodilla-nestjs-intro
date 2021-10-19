import { Address } from '../interfaces/address.interface';

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: Address;
  birthday?: string;
}
