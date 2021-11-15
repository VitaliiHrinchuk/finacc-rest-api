import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIncomeCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}