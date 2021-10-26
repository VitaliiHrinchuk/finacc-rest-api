import { Body, Controller, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/singInUserDto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInUserDto: SignInUserDto) {
    return this.authService.login(signInUserDto);
  }
}