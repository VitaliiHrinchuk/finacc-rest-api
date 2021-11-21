import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IncomeService } from "./income.service";
import { CreateIncomeDto } from "./dto/CreateIncomeDto";
import { UpdateIncomeCategoryDto } from "../income-category/dto/UpdateIncomeCategoryDto";
import { UpdateIncomeDto } from "./dto/UpdateIncomeDto";

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createIncomeDto: CreateIncomeDto, @Request() req) {
    createIncomeDto.userId = req.user.userId;

    return this.incomeService.create(createIncomeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.incomeService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') incomeId: string, @Body() updateIncomeDto: UpdateIncomeDto, @Request() req) {
    updateIncomeDto.userId = req.user.userId;
    updateIncomeDto.incomeId = incomeId;
    return this.incomeService.update(updateIncomeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') incomeId: string, @Request() req) {
    return this.incomeService.delete(incomeId);
  }


}