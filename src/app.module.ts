import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/user.model";
import { BudgetModule } from "./budget/budget.module";
import { Budget } from "./budget/budget.model";
import { TagModule } from "./tag/tag.module";
import { Tag } from "./tag/tag.model";
import { IncomeCategory } from "./income-category/income-category.model";
import { IncomeCategoryModule } from "./income-category/income-category.module";
import { OutcomeCategory } from "./outcome-category/outcome-category.model";
import { OutcomeCategoryModule } from "./outcome-category/outcome-category.module";
import { IncomeModule } from "./income/income.module";
import { Income } from "./income/income.model";
import { Outcome } from "./outcome/outcome.model";
import { OutcomeModule } from "./outcome/outcome.module";
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: "mysql",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USERNAME"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          models: [User, Budget, Tag, IncomeCategory, OutcomeCategory, Income, Outcome]
        };
      }
    }),
    BudgetModule,
    TagModule,
    IncomeCategoryModule,
    OutcomeCategoryModule,
    IncomeModule,
    OutcomeModule,
    CurrencyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
