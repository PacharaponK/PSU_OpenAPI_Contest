import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Member } from 'src/members/entities/member.entity';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MembersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<Member> {
    const user = await this.memberService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email};
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email
    };
  }
}