import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from "uuid";
import { OutcomeCategory } from "./outcome-category.model";
import { CreateOutcomeCategoryDto } from "./dto/CreateOutcomeCategoryDto";
import { Op } from "sequelize";
import { UpdateOutcomeCategoryDto } from "./dto/UpdateOutcomeCategoryDto";
import { IncomeCategory } from "../income-category/income-category.model";


@Injectable()
export class OutcomeCategoryService {
  constructor(
    @InjectModel(OutcomeCategory) private outcomeCategory: typeof OutcomeCategory,
    private userService: UsersService
  ) {}

  async create(createCategoryDto: CreateOutcomeCategoryDto, userId: string): Promise<OutcomeCategory> {
    const userExists = await this.userService.findUserById(userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const categoryExists = await this.outcomeCategory.findOne({
      where: {
        name: createCategoryDto.name
      }
    });

    if (categoryExists) {
      throw new BadRequestException(`Category with name '${createCategoryDto.name}' already exists`);
    }

    const category = await this.outcomeCategory.create({
      id: uuidv4(),
      name: createCategoryDto.name,
      userId: userId
    });

    return category;
  }

  async findOne(id: string): Promise<OutcomeCategory> {
    const category = await this.outcomeCategory.findByPk(id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async findAll(userId: string): Promise<Array<OutcomeCategory>> {

    const categorys = await this.outcomeCategory.findAll({
      where: {
        userId: {
          [Op.or]: [userId, null]
        }
      },
    });

    return categorys;
  }

  async update(updateCategoryDto: UpdateOutcomeCategoryDto, userId: string, categoryId: string): Promise<OutcomeCategory> {

    const category = await this.outcomeCategory.findOne({
      where: {
        id: categoryId,
      }
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new BadRequestException('You can update only your own incomeCategory')
    }

    category.setAttributes({
      name: updateCategoryDto.name,
    });

    return category.save();
  }

  async delete(categoryId: string, userId: string): Promise<void> {

    const category = await this.outcomeCategory.findOne({
      where: {
        id: categoryId
      }
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    if (category.userId !== userId) {
      throw new BadRequestException('You can delete only your own incomeCategory')
    }

    return await category.destroy();
  }

  findById(id: string): Promise<IncomeCategory | null> {
    return this.outcomeCategory.findByPk(id);
  }
}
