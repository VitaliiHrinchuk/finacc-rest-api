import { Module } from '@nestjs/common';
import { BudgetService } from "./budget.service";
import { BudgetController } from "./budget.controller";
import { JwtStrategy } from "../auth/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/user.model";
import { Budget } from "./budget.model";
import { CurrencyModule } from "../currency/currency.module";

@Module({
  controllers: [BudgetController],
  providers: [BudgetService],
  exports: [BudgetService],
  imports: [SequelizeModule.forFeature([Budget]), UsersModule, JwtStrategy, CurrencyModule]
})
export class BudgetModule {}
