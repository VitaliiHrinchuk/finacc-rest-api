import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Tag } from "./tag.model";
import { TagService } from "./tag.service";
import { TagController } from "./tag.controller";

@Module({
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
  imports: [SequelizeModule.forFeature([Tag]), UsersModule, JwtStrategy]
})
export class TagModule {}
