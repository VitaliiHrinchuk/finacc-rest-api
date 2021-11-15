import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/CreatetagDto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateTagDto } from "./dto/UpdatetagDto";

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTagDto: CreateTagDto, @Request() req) {
    return this.tagService.create(createTagDto, req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async read(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async browse(@Request() req) {
    return this.tagService.findAll(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') tagId: string, @Body() updateTagDto: UpdateTagDto, @Request() req) {
    return this.tagService.update(updateTagDto, req.user.userId, tagId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delete(@Param('id') tagId: string, @Request() req) {
    return this.tagService.delete(tagId, req.user.userId);
  }

}