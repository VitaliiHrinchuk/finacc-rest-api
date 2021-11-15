import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { IncomeCategoryService } from "./income-category.service";
import { CreateIncomeCategoryDto } from "./dto/CreateIncomeCategoryDto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateIncomeCategoryDto } from "./dto/UpdateIncomeCategoryDto";

@Controller('income-category')
export class IncomeCategoryController {
  constructor(private readonly incomeCategoryService: IncomeCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTagDto: CreateIncomeCategoryDto, @Request() req) {
    return this.incomeCategoryService.create(createTagDto, req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.incomeCategoryService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.incomeCategoryService.findAll(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') tagId: string, @Body() updateTagDto: UpdateIncomeCategoryDto, @Request() req) {
    return this.incomeCategoryService.update(updateTagDto, req.user.userId, tagId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') tagId: string, @Request() req) {
    return this.incomeCategoryService.delete(tagId, req.user.userId);
  }

}