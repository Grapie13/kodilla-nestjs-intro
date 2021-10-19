import { Address } from '../interfaces/address.interface';
import { UserDto } from './user.dto';

export class ExternalUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  birthday: string;

  static fromEntity(entity: UserDto): ExternalUserDto {
    return {
      ...entity,
      birthday: entity.birthday.toISOString(),
    };
  }
}
