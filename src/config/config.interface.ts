export enum Env {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  PROVISION = 'provision',
}

export interface IConfig {
  mysql: IMySql;
  aws: IAWS;
  onlineStore: IStore;
  mail: IMail;
  auth: IAuth;
}

export interface IMySql {
  url: string;
  port: number;
  host: string;
  password: string;
  user: string;
  databaseName: string;
}

export interface IAWS {
  s3: { region: string; keyId: string; secretKey: string; bucketName: string };
}
export interface IJWTOpt {
  secret: string;
  time: string;
}

export interface IStoreJWT {
  accessToken: IJWTOpt;
  refreshToken: IJWTOpt;
}

export interface IStore {
  env: Env;
  port: number;
  backendUrl: string;
  frontendUrl: string;
  jwt: IStoreJWT;
  admin: {
    name: string;
    email: string;
    password: string;
  };
}
export interface IMail {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: {
    name: string;
    address: string;
  };
}

export interface IAuth {
  mail: {
    jwt: {
      verification: IJWTOpt;
      resetPass: IJWTOpt;
    };
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackURL: string;
  };
}
