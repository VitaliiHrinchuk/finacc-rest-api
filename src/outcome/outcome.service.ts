import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from 'uuid';
import { Outcome } from "./outcome.model";
import { CreateOutcomeDto } from "./dto/CreateOutcomeDto";
import { BudgetService } from "../budget/budget.service";
import { OutcomeCategoryService } from "../outcome-category/outcome-category.service";
import { Budget } from "../budget/budget.model";
import { OutcomeCategory } from "../outcome-category/outcome-category.model";
import { User } from "../users/user.model";
import { UpdateOutcomeDto } from "./dto/UpdateOutcomeDto";


@Injectable()
export class OutcomeService {
  constructor(
    @InjectModel(Outcome) private outcomes: typeof Outcome,
    private userService: UsersService,
    private budgetService: BudgetService,
    private categoryService: OutcomeCategoryService,
  ) {}

  async create(createOutcomeDto: CreateOutcomeDto): Promise<Outcome> {
    const userExists = await this.userService.findUserById(createOutcomeDto.userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const budget = await this.budgetService.findById(createOutcomeDto.budgetId);

    if (!budget || budget.userId !== createOutcomeDto.userId) {
      throw new BadRequestException("Budget does not exists");
    }

    const outcomeCategory = await this.categoryService.findById(createOutcomeDto.categoryId);

    if (!outcomeCategory || (outcomeCategory.userId && outcomeCategory.userId != createOutcomeDto.userId)) {
      throw new BadRequestException("Category does not exists");
    }

    const outcome = await this.outcomes.create({
      id: uuidv4(),
      amount: createOutcomeDto.amount,
      currency: createOutcomeDto.currency,

      budgetId: createOutcomeDto.budgetId,
      categoryId: createOutcomeDto.categoryId,
      userId: createOutcomeDto.userId
    });

    await this.budgetService.updateBudgetAmount(outcome.budgetId, outcome.currency, -outcome.amount);

    return outcome.reload({
      include: [Budget]
    });
  }

  async findAll(userId: string): Promise<Array<Outcome>> {
    return this.outcomes.findAll({
      where: {
        userId: userId
      },
      include: [
        Budget,
        OutcomeCategory,
        User
      ]
    })
  }

  async findOne(outcomeId: string): Promise<Outcome | null> {
    const outcome = await  this.outcomes.findOne({
      where: {
        id: outcomeId
      },
      include: [
        Budget,
        OutcomeCategory,
        User
      ]
    });


    if (!outcome) {
      throw new NotFoundException();
    }

    return outcome;
  }

  async update(updateOutcomeDto: UpdateOutcomeDto): Promise<Outcome> {
    const userExists = await this.userService.findUserById(updateOutcomeDto.userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const outcome = await this.outcomes.findOne({
      where: {
        id: updateOutcomeDto.outcomeId,
      },
    });

    if (!outcome) {
      throw new NotFoundException("Outcome not found");
    }

    const budget = await this.budgetService.findById(updateOutcomeDto.budgetId);

    if (!budget || budget.userId !== updateOutcomeDto.userId) {
      throw new BadRequestException("Budget does not exists");
    }

    const outcomeCategory = await this.categoryService.findById(updateOutcomeDto.categoryId);

    if (!outcomeCategory || (outcomeCategory.userId && outcomeCategory.userId != updateOutcomeDto.userId)) {
      throw new BadRequestException("Category does not exists");
    }


    outcome.setAttributes({
      amount: updateOutcomeDto.amount,
      currency: updateOutcomeDto.currency,
      budgetId: updateOutcomeDto.budgetId,
      categoryId: updateOutcomeDto.categoryId,
      userId: updateOutcomeDto.userId
    })

    return outcome.save();
  }

  async delete(outcomeId: string): Promise<void> {
    const outcome = await this.outcomes.findOne({
      where: {
        id: outcomeId
      }
    });

    if (!outcome) {
      throw new NotFoundException("Outcome not found");
    }

    return outcome.destroy();
  }


}
