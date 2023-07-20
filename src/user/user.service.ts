import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Provider } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

export const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
  public async verifyByID(id: number): Promise<void> {
    await this.repo.verifyByUniqueInput({ id });
  }

  public async verifyByEmail(email: string): Promise<void> {
    await this.repo.verifyByUniqueInput({ email });
  }

  public async changePassword(
    id: number,
    password: string,
    provider: Provider,
  ) {
    await this.repo.changePassword(id, password, provider);
    return { ok: true };
  }

  public async add(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.add(dto);

    return user ? new User(user) : null;
  }

  public async createAdmin(
    dto: CreateUserDto & { provider?: Provider },
  ): Promise<User> {
    const user = await this.repo.createAdmin(dto);

    return user ? new User(user) : null;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.repo.getByUniqueInput({ email });

    return user ? new User(user) : null;
  }

  public async getByEmailAndProvider(
    email: string,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({ email, provider });

    return user ? new User(user) : null;
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

    return user ? new User(user) : null;
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

    return user ? new User(user) : user;
  }

  public async getById(id: number): Promise<User> {
    const user = await this.repo.getByUniqueInput({ id });

    return user ? new User(user) : null;
  }

  public async getByIdAndProvider(
    id: number,
    provider: Provider,
  ): Promise<User> {
    const user = await this.repo.getByUniqueInput({ id, provider });

    return user ? new User(user) : null;
  }

  public async updateById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.repo.updateById(id, dto);

    return user ? new User(user) : null;
  }

  public async deleteById(id: number): Promise<User> {
    const user = await this.repo.deleteById(id);

    return user ? new User(user) : null;
  }
}
