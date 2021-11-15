import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { OutcomeCategoryService } from "./outcome-category.service";
import { CreateOutcomeCategoryDto } from "./dto/CreateOutcomeCategoryDto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateOutcomeCategoryDto } from "./dto/UpdateOutcomeCategoryDto";

@Controller('outcome-category')
export class OutcomeCategoryController {
  constructor(private readonly outcomeCategoryService: OutcomeCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTagDto: CreateOutcomeCategoryDto, @Request() req) {
    return this.outcomeCategoryService.create(createTagDto, req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.outcomeCategoryService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.outcomeCategoryService.findAll(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') tagId: string, @Body() updateTagDto: UpdateOutcomeCategoryDto, @Request() req) {
    return this.outcomeCategoryService.update(updateTagDto, req.user.userId, tagId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') tagId: string, @Request() req) {
    return this.outcomeCategoryService.delete(tagId, req.user.userId);
  }

}