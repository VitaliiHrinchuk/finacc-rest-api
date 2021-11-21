import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateOutcomeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @IsUUID()
  budgetId: string

  @IsNotEmpty()
  @IsUUID()
  categoryId: string

  userId: string;
}