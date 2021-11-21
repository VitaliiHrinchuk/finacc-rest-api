import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { OutcomeService } from "./outcome.service";
import { CreateOutcomeDto } from "./dto/CreateOutcomeDto";
import { UpdateOutcomeDto } from "./dto/UpdateOutcomeDto";

@Controller('outcome')
export class OutcomeController {
  constructor(private readonly outcomeService: OutcomeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOutcomeDto: CreateOutcomeDto, @Request() req) {
    createOutcomeDto.userId = req.user.userId;

    return this.outcomeService.create(createOutcomeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.outcomeService.findAll(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.outcomeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') outcomeId: string, @Body() updateOutcomeDto: UpdateOutcomeDto, @Request() req) {
    updateOutcomeDto.userId = req.user.userId;
    updateOutcomeDto.outcomeId = outcomeId;
    return this.outcomeService.update(updateOutcomeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') outcomeId: string, @Request() req) {
    return this.outcomeService.delete(outcomeId);
  }


}