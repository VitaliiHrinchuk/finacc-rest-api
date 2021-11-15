import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "./tag.model";
import { CreateTagDto } from "./dto/CreateTagDto";
import { Op } from "sequelize";
import { UpdateTagDto } from "./dto/UpdateTagDto";


@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag) private tags: typeof Tag,
    private userService: UsersService
  ) {}

  async create(createTagDto: CreateTagDto, userId: string): Promise<Tag> {
    const userExists = await this.userService.findUserById(userId);

    if (!userExists) {
      throw new BadRequestException("User does not exists");
    }

    const tagExists = await this.tags.findOne({
      where: {
        name: createTagDto.name
      }
    });

    if (tagExists) {
      throw new BadRequestException(`Tag with name '${createTagDto.name}' already exists`);
    }

    const tag = await this.tags.create({
      id: uuidv4(),
      name: createTagDto.name,
      userId: userId
    });

    return tag;
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tags.findByPk(id);

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  async findAll(userId: string): Promise<Array<Tag>> {

    const tags = await this.tags.findAll({
      where: {
        userId: {
          [Op.or]: [userId, null]
        }
      }
    });

    return tags;
  }

  async update(updateTagDto: UpdateTagDto, userId: string, tagId: string): Promise<Tag> {

    const tag = await this.tags.findOne({
      where: {
        id: tagId,
      }
    });

    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    if (tag.userId !== userId) {
      throw new BadRequestException('You can update only your own tags')
    }

    tag.setAttributes({
      name: updateTagDto.name,
    });

    return tag.save();
  }

  async delete(tagId: string, userId: string): Promise<void> {

    const tag = await this.tags.findOne({
      where: {
        id: tagId
      }
    });

    if (!tag) {
      throw new NotFoundException("Tag not found");
    }

    if (tag.userId !== userId) {
      throw new BadRequestException('You can delete only your own tags')
    }

    return await tag.destroy();
  }
}
