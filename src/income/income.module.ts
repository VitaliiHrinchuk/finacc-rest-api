import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Income } from "./income.model";
import { BudgetModule } from "../budget/budget.module";
import { TagModule } from "../tag/tag.module";
import { IncomeCategoryModule } from "../income-category/income-category.module";
import { IncomeService } from "./income.service";
import { IncomeController } from "./income.controller";

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
  imports: [
    SequelizeModule.forFeature([Income]),
    UsersModule,
    JwtStrategy,
    BudgetModule,
    TagModule,
    IncomeCategoryModule
  ],
  exports: [IncomeService]
})
export class IncomeModule {}
