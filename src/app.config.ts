import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface AppConfig {
  redis: RedisConfig;
  typeOrm: TypeOrmModuleOptions;
}

export interface RedisConfig {
  host: string;
  port: number;
}

export const appConfig = (): AppConfig => ({
  redis: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string),
  },
  typeOrm: {
    type: 'sqlite',
    database: process.env.DB_NAME as string,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
