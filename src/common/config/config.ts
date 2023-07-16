import { Env } from 'src/common/dto/dotenv.dto';
const { env } = process;

export type IConfig = typeof config;
export type IMySql = typeof config.mysql;
export type IAWS = typeof config.aws;
export type IStoreJWT = typeof config.onlineStore.jwt;
export type IStore = typeof config.onlineStore;

const config = {
  env: env.NODE_ENV,
  port: +env.PORT,
  mysql: {
    url: env.NODE_ENV === Env.Test ? env.TEST_DB_URL : env.DB_URL,
  },
  onlineStore: {
    projectUrl: env.PROJECT_URL,
    jwt: {
      accessToken: {
        secret: env.JWT_ACCESS_TOKEN_SECRET,
        time: env.JWT_ACCESS_TOKEN_TIME,
      },
      refreshToken: {
        secret: env.JWT_REFRESH_TOKEN_SECRET,
        time: env.JWT_REFRESH_TOKEN_TIME,
      },
    },
  },
  aws: {
    s3: {
      region: env.AWS_S3_REGION,
      keyId: env.AWS_S3_ACCESS_KEY_ID,
      secretKey: env.AWS_S3_SECRET_ACCESS_KEY,
      bucketName: env.AWS_PUBLIC_BUCKET_NAME,
    },
  },
  mail: {
    host: env.MAIL_HOST,
    port: +env.MAIL_PORT,
    secure: !!env.MAIL_SECURE,
    auth: {
      user: env.MAIL_AUTH_USER,
      pass: env.MAIL_AUTH_PASS,
    },
    from: {
      name: env.MAIL_FROM_NAME,
      address: env.MAIL_FROM,
    },
  },
  auth: {
    mail: {
      jwt: {
        time: env.MAIL_VALIDATE_TOKEN_TIME,
        secret: env.MAIL_VALIDATE_TOKEN_SECRET,
      },
    },
    google: {
      clientId: env.AUTH_GOOGLE_APP_ID,
      clientSecret: env.AUTH_GOOGLE_APP_SECRET,
      callbackURL: env.AUTH_GOOGLE_CALLBACK,
    },
    facebook: {
      appSecret: env.AUTH_FACEBOOK_APP_SECRET,
      appId: env.AUTH_FACEBOOK_APP_ID,
    },
  },
};
export const getEnvVar = () => config;
