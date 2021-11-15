import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateBudgetDto {

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @IsString()
  name: string;

}