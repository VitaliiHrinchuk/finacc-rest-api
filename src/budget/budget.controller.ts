import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { CreateBudgetDto } from "./dto/CreateBudgetDto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateBudgetDto } from "./dto/UpdateBudgetDto";

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBudgetDto: CreateBudgetDto, @Request() req) {
    return this.budgetService.create(createBudgetDto, req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.budgetService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.budgetService.findAll(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') budgetId: string, @Body() updateBudgetDto: UpdateBudgetDto, @Request() req) {
    return this.budgetService.update(updateBudgetDto, req.user.userId, budgetId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') budgetId: string, @Request() req) {
    return this.budgetService.delete(budgetId, req.user.userId);
  }

}