import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.services';
import { ConnectionOptions } from 'typeorm';
console.log(__dirname);
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: true,
        type: 'postgres' as 'postgres',
        host: config.Get(Configuration.PORT),
        username: config.Get(Configuration.DB_USER),
        password: config.Get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../**/*entity{.ts,.js}'],
        migrations: ['/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
