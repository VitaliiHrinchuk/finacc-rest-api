import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBudgetDto } from "./dto/CreateBudgetDto";
import { InjectModel } from "@nestjs/sequelize";
import { Budget } from "./budget.model";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from 'uuid';
import { UpdateBudgetDto } from "./dto/UpdateBudgetDto";
import { CurrencyService } from "../currency/currency.service";


@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget) private budgets: typeof Budget,
    private userService: UsersService,
    private currencyService: CurrencyService
  ) {}

  async create(createBudgetDto: CreateBudgetDto, userId: string): Promise<Budget> {
    const userExists = await this.userService.findUserById(userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const budget = await this.budgets.create({
      id: uuidv4(),
      amount: createBudgetDto.amount,
      currency: createBudgetDto.currency,
      name: createBudgetDto.name,
      userId: userId
    });

    return budget;
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgets.findByPk(id);

    if (!budget) {
      throw new NotFoundException();
    }

    return budget;
  }

  async findAll(userId: string): Promise<Array<Budget>> {
    const budgets = await this.budgets.findAll({
      where: {
        userId: userId
      }
    });

    return budgets;
  }

  async update(updateBudgetDto: UpdateBudgetDto, userId: string, budgetId: string): Promise<Budget> {
    const budget = await this.budgets.findOne({
      where: {
        id: budgetId,
        userId: userId
      }
    });

    if (!budget) {
      throw new NotFoundException("Budget not found");
    }

    budget.setAttributes({
      amount: updateBudgetDto.amount,
      currency: updateBudgetDto.currency,
      name: updateBudgetDto.name,
    })

    return budget.save();
  }

  async delete(budgetId: string, userId: string): Promise<void> {
    const budget = await this.budgets.findOne({
      where: {
        id: budgetId,
        userId: userId
      }
    });

    if (!budget) {
      throw new NotFoundException("Budget not found");
    }

    return await budget.destroy();
  }

  findById(id: string): Promise<Budget | null> {
    return this.budgets.findByPk(id);
  }

  async updateBudgetAmount(budgetId: string, targetCurrency: string, amount: number): Promise<void> {
    console.log('====== Updating budget amount...');
    const budget: Budget = await this.findById(budgetId);
    const convertedAmount: number = await this.convertCurrency(budget.currency, targetCurrency, amount);
    budget.amount = budget.amount + convertedAmount;
    await budget.save();
  }

  async convertCurrency(base: string, target: string, amount: number){
    return this.currencyService.convert(base, target, amount);
  }
}
