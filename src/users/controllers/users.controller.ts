import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ExternalUserDto } from '../dto/external-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAllUsers(): ExternalUserDto[] {
    const users = this.usersService.getAllUsers();

    return users.map((user) => ExternalUserDto.fromEntity(user));
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): ExternalUserDto {
    const user = this.usersService.getUserById(id);

    return ExternalUserDto.fromEntity(user);
  }

  @Post('')
  createUser(@Body() userDto: CreateUserDto): ExternalUserDto {
    const user = this.usersService.createUser(userDto);

    return ExternalUserDto.fromEntity(user);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): ExternalUserDto {
    const user = this.usersService.updateUser(id, userDto);

    return ExternalUserDto.fromEntity(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): ExternalUserDto {
    const user = this.usersService.deleteUser(id);

    return ExternalUserDto.fromEntity(user);
  }
}
