import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Provider } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { Ok } from 'src/common/dto/ok.dto';
export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}
  static userNotExistException = new UnprocessableEntityException(
    'User not exist',
  );

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  public async verifyByID(id: number): Promise<Ok> {
    await this.repo.verifyByUniqueInput({ id });

    return new Ok();
  }

  public async verifyByEmail(email: string): Promise<Ok> {
    await this.repo.verifyByUniqueInput({ email });

    return new Ok();
  }

  public async changePassword(
    id: number,
    password: string,
    provider: Provider,
  ): Promise<Ok> {
    await this.repo.changePassword(id, password, provider);
    return new Ok();
  }

  public async add(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.add(dto);

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async createAdmin(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.createAdmin(dto);

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.repo.getByUniqueInput({ email });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getByEmailAndProvider(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({ email, provider });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getByEmailVerified(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({
      email,
      provider,
      verified: true,
    });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getByEmailUnverified(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({
      email,
      provider,
      verified: false,
    });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getById(id: number): Promise<User> {
    const user = await this.repo.getByUniqueInput({ id });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async getByIdAndProvider(
    id: number,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({ id, provider });

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async updateById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.repo.updateById(id, dto);

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }

  public async deleteById(id: number): Promise<User> {
    const user = await this.repo.deleteById(id);

    if (!user) throw UserService.userNotExistException;

    return new User(user);
  }
}
