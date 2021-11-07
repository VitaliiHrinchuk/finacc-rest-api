import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBudgetDto } from "./dto/CreateBudgetDto";
import { InjectModel } from "@nestjs/sequelize";
import { Budget } from "./budget.model";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget) private budgets: typeof Budget,
    private userService: UsersService
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
}
