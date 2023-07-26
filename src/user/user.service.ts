import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Provider } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { Done } from '@shared/dto/done.dto';
import { CartService } from '@cart/cart.service';
export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
    private readonly cartService: CartService,
  ) {}
  static userNotExistException = new UnprocessableEntityException(
    'User not exist',
  );

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  public async verifyByID(id: number): Promise<Done> {
    await this.repo.verifyByUniqueInput({ id });

    return new Done();
  }

  public async verifyByEmail(email: string): Promise<Done> {
    await this.repo.verifyByUniqueInput({ email });

    return new Done();
  }

  public async changePassword(
    id: number,
    password: string,
    provider: Provider,
  ): Promise<Done> {
    await this.repo.changePassword(id, password, provider);
    return new Done();
  }

  public async create(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.create(dto);

    if (!user) throw UserService.userNotExistException;
    await this.cartService.create(user.id);

    return new User(user);
  }

  public async createAdmin(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.createAdmin(dto);

    if (!user) throw UserService.userNotExistException;
    await this.cartService.create(user.id);

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
      isEmailConfirmed: true,
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
      isEmailConfirmed: false,
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
