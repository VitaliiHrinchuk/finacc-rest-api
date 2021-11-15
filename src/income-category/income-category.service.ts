import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from "uuid";
import { IncomeCategory } from "./income-category.model";
import { CreateIncomeCategoryDto } from "./dto/CreateIncomeCategoryDto";
import { Op } from "sequelize";
import { UpdateIncomeCategoryDto } from "./dto/UpdateIncomeCategoryDto";


@Injectable()
export class IncomeCategoryService {
  constructor(
    @InjectModel(IncomeCategory) private incomeCategory: typeof IncomeCategory,
    private userService: UsersService
  ) {}

  async create(createCategoryDto: CreateIncomeCategoryDto, userId: string): Promise<IncomeCategory> {
    const userExists = await this.userService.findUserById(userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const categoryExists = await this.incomeCategory.findOne({
      where: {
        name: createCategoryDto.name
      }
    });

    if (categoryExists) {
      throw new BadRequestException(`Category with name '${createCategoryDto.name}' already exists`);
    }

    const category = await this.incomeCategory.create({
      id: uuidv4(),
      name: createCategoryDto.name,
      userId: userId
    });

    return category;
  }

  async findOne(id: string): Promise<IncomeCategory> {
    const category = await this.incomeCategory.findByPk(id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async findAll(userId: string): Promise<Array<IncomeCategory>> {

    const categorys = await this.incomeCategory.findAll({
      where: {
        userId: {
          [Op.or]: [userId, null]
        }
      },
    });

    return categorys;
  }

  async update(updateCategoryDto: UpdateIncomeCategoryDto, userId: string, categoryId: string): Promise<IncomeCategory> {

    const category = await this.incomeCategory.findOne({
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

    const category = await this.incomeCategory.findOne({
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
}
