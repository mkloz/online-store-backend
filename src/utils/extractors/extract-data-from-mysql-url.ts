import { IMySql } from '@config/config.interface';
export const MYSQL_URL_REGEXP =
  /mysql:\/\/([^:]*):([^@]*)@([^:/]*):([^/]*)\/([^?]*)/;

export function extractDatabaseComponents(
  databaseUrl: string,
): Omit<IMySql, 'url'> {
  const [, user, password, host, port, databaseName] =
    databaseUrl.match(MYSQL_URL_REGEXP) || [];

  return {
    user,
    password,
    host,
    port: +port,
    databaseName,
  };
}
