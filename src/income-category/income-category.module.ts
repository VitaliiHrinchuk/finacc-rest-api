import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { IncomeCategory } from "./income-category.model";
import { IncomeCategoryService } from "./income-category.service";
import { IncomeCategoryController } from "./income-category.controller";

@Module({
  controllers: [IncomeCategoryController],
  providers: [IncomeCategoryService],
  exports: [IncomeCategoryService],
  imports: [SequelizeModule.forFeature([IncomeCategory]), UsersModule, JwtStrategy]
})
export class IncomeCategoryModule {}
