import { registerAs } from '@nestjs/config';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ConfigValidator } from '../config.validator';
import { IMySql } from '../config.interface';
const { env } = process;

export class MySqlVariables {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS: string;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsOptional()
  DATABASE_URL?: string;
}

export const mySqlConfig = registerAs<IMySql>('mysql', () => {
  ConfigValidator.validate(env, MySqlVariables);

  return {
    url: env.DATABASE_URL,
    port: +env.DB_PORT,
    host: env.DB_HOST,
    password: env.DB_PASS,
    user: env.DB_USER,
    databaseName: env.DB_NAME,
  };
});
