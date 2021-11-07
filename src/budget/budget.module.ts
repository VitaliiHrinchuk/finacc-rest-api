import { Module } from '@nestjs/common';
import { BudgetService } from "./budget.service";
import { BudgetController } from "./budget.controller";
import { JwtStrategy } from "../auth/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { Budget } from "./budget.model";

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
  imports: [SequelizeModule.forFeature([Budget]), UsersModule, JwtStrategy]
})
export class BudgetModule {}
