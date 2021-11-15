import { IsNotEmpty, IsString } from "class-validator";

export class CreateOutcomeCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}