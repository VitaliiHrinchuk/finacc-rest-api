import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from 'uuid';
import { Income } from "./income.model";
import { CreateIncomeDto } from "./dto/CreateIncomeDto";
import { BudgetService } from "../budget/budget.service";
import { IncomeCategoryService } from "../income-category/income-category.service";
import { Budget } from "../budget/budget.model";
import { IncomeCategory } from "../income-category/income-category.model";
import { User } from "../users/user.model";
import { UpdateIncomeDto } from "./dto/UpdateIncomeDto";


@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income) private incomes: typeof Income,
    private userService: UsersService,
    private budgetService: BudgetService,
    private categoryService: IncomeCategoryService,
  ) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const userExists = await this.userService.findUserById(createIncomeDto.userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const budget = await this.budgetService.findById(createIncomeDto.budgetId);

    if (!budget || budget.userId !== createIncomeDto.userId) {
      throw new BadRequestException("Budget does not exists");
    }

    const incomeCategory = await this.categoryService.findById(createIncomeDto.categoryId);

    if (!incomeCategory || (incomeCategory.userId && incomeCategory.userId != createIncomeDto.userId)) {
      throw new BadRequestException("Category does not exists");
    }

    const income = await this.incomes.create({
      id: uuidv4(),
      amount: createIncomeDto.amount,
      currency: createIncomeDto.currency,

      budgetId: createIncomeDto.budgetId,
      categoryId: createIncomeDto.categoryId,
      userId: createIncomeDto.userId
    });

    await this.budgetService.updateBudgetAmount(income.budgetId, income.currency, income.amount);

    return income.reload({
      include: [Budget]
    });
  }

  async findAll(userId: string): Promise<Array<Income>> {
    return this.incomes.findAll({
      where: {
        userId: userId
      },
      include: [
        Budget,
        IncomeCategory,
        User
      ]
    })
  }

  async findOne(incomeId: string): Promise<Income | null> {
    const income = await  this.incomes.findOne({
      where: {
        id: incomeId
      },
      include: [
        Budget,
        IncomeCategory,
        User
      ]
    });


    if (!income) {
      throw new NotFoundException();
    }

    return income;
  }

  async update(updateIncomeDto: UpdateIncomeDto): Promise<Income> {
    const userExists = await this.userService.findUserById(updateIncomeDto.userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const income = await this.incomes.findOne({
      where: {
        id: updateIncomeDto.incomeId,
      },
    });

    if (!income) {
      throw new NotFoundException("Income not found");
    }

    const budget = await this.budgetService.findById(updateIncomeDto.budgetId);

    if (!budget || budget.userId !== updateIncomeDto.userId) {
      throw new BadRequestException("Budget does not exists");
    }

    const incomeCategory = await this.categoryService.findById(updateIncomeDto.categoryId);

    if (!incomeCategory || (incomeCategory.userId && incomeCategory.userId != updateIncomeDto.userId)) {
      throw new BadRequestException("Category does not exists");
    }


    income.setAttributes({
      amount: updateIncomeDto.amount,
      currency: updateIncomeDto.currency,
      budgetId: updateIncomeDto.budgetId,
      categoryId: updateIncomeDto.categoryId,
      userId: updateIncomeDto.userId
    })

    return income.save();
  }

  async delete(incomeId: string): Promise<void> {
    const income = await this.incomes.findOne({
      where: {
        id: incomeId
      }
    });

    if (!income) {
      throw new NotFoundException("Income not found");
    }

    return income.destroy();
  }


}
