import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { BudgetService } from "./budget.service";
import { CreateBudgetDto } from "./dto/CreateBudgetDto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

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

}