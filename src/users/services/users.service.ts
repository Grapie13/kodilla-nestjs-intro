import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ExternalUserDto } from '../dto/external-user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[];

  constructor() {
    this.users = [];
  }

  getAllUsers(): UserDto[] {
    return this.users;
  }

  getUserById(id: string): UserDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  private getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  createUser(userDto: CreateUserDto): UserDto {
    let user = this.getUserByEmail(userDto.email);

    if (user) {
      throw new BadRequestException('A user with that email already exists!');
    }

    user = {
      ...userDto,
      birthday: new Date(userDto.birthday),
      id: uuid(),
    };
    this.users.push(user);

    return user;
  }

  updateUser(id: string, userDto: UpdateUserDto) {
    let updatedUser = this.getUserById(id);

    if (!updatedUser) {
      throw new NotFoundException('User not found!');
    }

    updatedUser = {
      ...updatedUser,
      ...userDto,
      birthday: new Date(userDto.birthday),
      id, // Overwrite id just in case the user tried to change it
    };
    this.users.map((user) => {
      if (user.id === id) {
        return updatedUser;
      }

      return user;
    });

    return updatedUser;
  }

  deleteUser(id: string): UserDto {
    const user = this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
