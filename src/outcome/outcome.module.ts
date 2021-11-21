import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "../auth/jwt.strategy";
import { Outcome } from "./outcome.model";
import { BudgetModule } from "../budget/budget.module";
import { TagModule } from "../tag/tag.module";
import { OutcomeService } from "./outcome.service";
import { OutcomeController } from "./outcome.controller";
import { OutcomeCategoryModule } from "../outcome-category/outcome-category.module";

@Module({
  controllers: [OutcomeController],
  providers: [OutcomeService],
  imports: [
    SequelizeModule.forFeature([Outcome]),
    UsersModule,
    JwtStrategy,
    BudgetModule,
    TagModule,
    OutcomeCategoryModule
  ],
  exports: [OutcomeService]
})
export class OutcomeModule {}
