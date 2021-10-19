import { Address } from '../interfaces/address.interface';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  birthday: Date;
}
