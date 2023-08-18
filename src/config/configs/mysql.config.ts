import { registerAs } from '@nestjs/config';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
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
}

export const mySqlConfig = registerAs<IMySql>('mysql', () => {
  ConfigValidator.validate(env, MySqlVariables);

  return {
    port: Number(env.DB_PORT || 3306),
    host: env.DB_HOST || 'localhost',
    password: env.DB_PASS || 'pass',
    user: env.DB_USER || 'root',
    databaseName: env.DB_NAME || '',
  };
});
