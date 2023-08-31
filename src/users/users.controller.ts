import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  // @ApiBody({description:"This is an example"})
  @ApiBearerAuth()
  @Post()
  createUser(@Body() userDto: UserDto) {
    const newUser = this.usersService.createUser(userDto);
    return newUser;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const getUserById = this.usersService.getUserById(id);
    return getUserById;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const updateUserById = this.usersService.updateUserById(id, updateUserDto);
    return updateUserById;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    const deleteByUser = this.usersService.deleteUser(id);
    return deleteByUser;
  }
}
