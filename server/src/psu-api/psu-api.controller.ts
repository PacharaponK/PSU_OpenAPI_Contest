import { Controller, Get, Headers } from '@nestjs/common';
import { PsuApiService } from './psu-api.service';

@Controller('psu-api')
export class PsuApiController {
  constructor(private readonly psuApiService: PsuApiService) {}

  @Get('studentDetail')
  findStudentDetail(@Headers('token') token: string) {
    return this.psuApiService.getStudentDetail(token);
  }

  @Get('studentImage')
  findStudentImage(@Headers('token') token: string) {
    return this.psuApiService.getStudentImage(token);
  }
}
