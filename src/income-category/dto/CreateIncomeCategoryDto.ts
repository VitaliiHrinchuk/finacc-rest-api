import { IsNotEmpty, IsString } from "class-validator";

export class CreateIncomeCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}