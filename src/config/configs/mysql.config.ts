import { registerAs } from '@nestjs/config';
import { IsString, Matches } from 'class-validator';
import { ConfigValidator } from '../config.validator';
import { IMySql } from '../config.interface';
import { Extractor, MYSQL_URL_REGEXP } from '@utils/extractors';
const { env } = process;

export class MySqlVariables {
  @IsString()
  @Matches(MYSQL_URL_REGEXP)
  DATABASE_URL: string;
}

export const mySqlConfig = registerAs<IMySql>('mysql', () => {
  ConfigValidator.validate(env, MySqlVariables);

  const vars = Extractor.extractDatabaseConfig(env.DATABASE_URL || '');
  return {
    url: env.DATABASE_URL || '',
    port: vars.port,
    host: vars.host,
    password: vars.password,
    user: vars.user,
    databaseName: vars.databaseName,
  };
});
