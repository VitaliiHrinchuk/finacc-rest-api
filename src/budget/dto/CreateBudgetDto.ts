import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBudgetDto {

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @IsString()
  name: string;

}