import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt";
import { SignInUserDto } from "./dto/singInUserDto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async login(signInUserDto: SignInUserDto): Promise<any> {
    const user = await this.validateUser(signInUserDto);
    if (user !== null) {
      const payload = { username: user.username, sub: user.uuid };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException('Wrong email and password combination');
    }
  }

  async validateUser(signInUserDto: SignInUserDto): Promise<any> {
    console.log(signInUserDto);
    const user = await this.usersService.findOne(signInUserDto.email);
    if (user && user.password === signInUserDto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
