import { Controller, Post, Body, Delete, Param, UseGuards, Request, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  
  
  @Post("/register")
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }
  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.membersService.delete(id);
  }

  @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  async getProfile(@Request() request) {
    const { req } = request;
    return await this.membersService.findByEmail(req)
  }
}
