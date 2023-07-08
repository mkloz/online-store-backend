import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsEnum(Env)
  NODE_ENV: Env;

  @IsNumber()
  PORT: number;

  @MinLength(8)
  @IsString()
  DB_URL: string;

  @MinLength(8)
  @IsString()
  TEST_DB_URL: string;

  @MinLength(8)
  @IsString()
  PROJECT_URL: string;

  @IsString()
  AWS_S3_REGION: string;

  @IsString()
  AWS_S3_ACCESS_KEY_ID: string;

  @IsString()
  AWS_S3_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_PUBLIC_BUCKET_NAME: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_TIME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_TIME: string;
}
