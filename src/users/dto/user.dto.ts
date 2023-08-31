import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  status: boolean;
}

export class SignInUserDto {
  id: number;
  email: string;
  createdAt: Date;
  status: Boolean;
}
