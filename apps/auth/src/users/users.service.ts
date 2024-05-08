import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';
import { hash, compare } from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async findOne(user: GetUserDto) {
    return this.repo.findOne({ where: user });
  }

  async createOne(user: CreateUserDto) {
    await this.validateCreateUserDto(user);
    const savedUser = await this.repo.save({
      ...user,
      password: await hash(user.password, 10),
    });
    return { id: savedUser.id };
  }

  async verify({ email, password }: Pick<CreateUserDto, 'email' | 'password'>) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isUserValid = await compare(password, user.password);
    if (!isUserValid) {
      throw new UnauthorizedException('Credentials are wrong');
    }
    return user;
  }

  private async validateCreateUserDto(user: CreateUserDto) {
    const existingUser = await this.findOne({ email: user.email });
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exist');
    }
    return true;
  }
}
