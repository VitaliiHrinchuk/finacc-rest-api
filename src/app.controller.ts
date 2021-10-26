import { Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { AppService } from './app.service';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return "test";
  }
}
