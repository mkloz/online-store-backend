import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ConfigValidator } from './config.validator';
import { registerAs } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { IStore } from './config.interface';
const { env } = process;

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}
export class OnlineStoreVariables {
  @IsEnum(Env)
  NODE_ENV: Env;

  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsUrl({ require_tld: false })
  FRONTEND_URL: string;

  @IsUrl({ require_tld: false })
  BACKEND_URL: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  JWT_ACCESS_TOKEN_SECRET?: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_TIME: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET?: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_TIME: string;
}

export const onlineStoreConfig = registerAs<IStore>('onlineStore', () => {
  ConfigValidator.validate(env, OnlineStoreVariables);

  return {
    env: env.NODE_ENV as Env,
    port: +env.PORT ?? 3000,
    backendUrl: env.BACKEND_URL,
    frontendUrl: env.FRONTEND_URL,
    jwt: {
      accessToken: {
        secret: env.JWT_ACCESS_TOKEN_SECRET ?? randomUUID(),
        time: env.JWT_ACCESS_TOKEN_TIME,
      },
      refreshToken: {
        secret: env.JWT_REFRESH_TOKEN_SECRET ?? randomUUID(),
        time: env.JWT_REFRESH_TOKEN_TIME,
      },
    },
  };
});
