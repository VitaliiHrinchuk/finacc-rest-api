import { Body, Controller, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/SingInUserDto";
import { SignUpUserDto } from "./dto/SignUpUserDto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }

  @Post('register')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }
}