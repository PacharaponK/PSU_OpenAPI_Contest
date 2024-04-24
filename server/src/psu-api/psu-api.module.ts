import { Module } from '@nestjs/common';
import { PsuApiService } from './psu-api.service';
import { PsuApiController } from './psu-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PsuApiController],
  providers: [PsuApiService],
})
export class PsuApiModule {}
