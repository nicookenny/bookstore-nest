import { Module } from '@nestjs/common';
import { ConfigService } from './config.services';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
