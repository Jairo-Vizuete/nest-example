import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(id: number): Promise<User> {
    console.log(`Searching user by id:${id}`);
    const userById = await this.userRepository.findOne({
      where: { id: id },
    });
    console.log(`The user is: ${JSON.stringify(userById)}`);
    return userById;
  }

  async getUserByEmail(email: string): Promise<User> {
    console.log(`Searching user by email: ${email}`);
    const userByEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    return userByEmail;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const passwordEncrypt = await this.hashPassword(userDto.password);
    const newUser = await this.userRepository.save(
      this.userRepository.create({
        ...userDto,
        password: passwordEncrypt,
      }),
    );
    return newUser;
  }

  async deleteUser(id: number): Promise<string> {
    const userById = await this.getUserById(id);
    console.log(userById);
    if (!userById) {
      return `There isn't the user with id: ${id}`;
    }
    const userToDelete = await this.userRepository.delete(id);
    return JSON.stringify(userToDelete);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const userById = await this.getUserById(id);
    if (!userById) {
      return `The user with id: ${id} doesn't exist`;
    }
    const userUpdate = await this.userRepository.update(id, updateUserDto);
    return userUpdate;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10; // Número de rondas de sal (recomendado >= 10)
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
