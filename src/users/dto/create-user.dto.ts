import { Address } from '../interfaces/address.interface';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  birthday: string;
}
