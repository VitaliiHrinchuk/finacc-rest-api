import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { OutcomeCategory } from "./outcome-category.model";
import { OutcomeCategoryService } from "./outcome-category.service";
import { OutcomeCategoryController } from "./outcome-category.controller";

@Module({
  controllers: [OutcomeCategoryController],
  providers: [OutcomeCategoryService],
  exports: [OutcomeCategoryService],
  imports: [SequelizeModule.forFeature([OutcomeCategory]), UsersModule, JwtStrategy]
})
export class OutcomeCategoryModule {}
