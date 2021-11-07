import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt";
import { SignInUserDto } from "./dto/SingInUserDto";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { SignUpUserDto } from "./dto/SignUpUserDto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(signInUserDto: SignInUserDto): Promise<any> {
    const user = await this.validateUser(signInUserDto);
    if (user !== null) {
      const payload = { sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException('Wrong email and password combination');
    }
  }

  async validateUser(signInUserDto: SignInUserDto): Promise<User> {
    const user = await this.usersService.findUser(signInUserDto.email);
    if (user) {
      const passwordMatched = await bcrypt.compare(signInUserDto.password, user.pass_hash);

      return passwordMatched ? user : null;
    }
    return null;
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<boolean> {
    const userExists = await this.usersService.checkUserExist(signUpUserDto.email);
    if (!userExists) {
      await this.usersService.createUser(signUpUserDto.email, signUpUserDto.password);
      return true;
    } else {
      throw new BadRequestException('User with this email already exists');
    }
  }
}
