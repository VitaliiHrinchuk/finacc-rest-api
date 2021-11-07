import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [SequelizeModule.forFeature([User]), ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
