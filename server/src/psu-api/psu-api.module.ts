import { Module } from '@nestjs/common';
import { PsuApiService } from './psu-api.service';
import { PsuApiController } from './psu-api.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [PsuApiController],
  providers: [PsuApiService],
})
export class PsuApiModule {}
