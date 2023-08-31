import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto, UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userDto: UserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    console.log(user);
    if (
      !(await this.usersService.comparePasswords(
        userDto.password,
        user?.password,
      ))
    ) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: result.id, email: result.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }
}
