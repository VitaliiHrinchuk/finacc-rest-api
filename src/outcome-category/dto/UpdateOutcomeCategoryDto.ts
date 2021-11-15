import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOutcomeCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}