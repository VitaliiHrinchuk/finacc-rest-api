import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { IncomeCategory } from "../income-category/income-category.model";
import { Budget } from "../budget/budget.model";
import { OutcomeCategory } from "../outcome-category/outcome-category.model";

@Table({
  timestamps: true
})
export class Outcome extends Model {
  @Column({ primaryKey: true, autoIncrement: false })
  id: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  currency: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Budget)
  @Column
  budgetId: string;

  // @ForeignKey(() => Tag)
  // @Column
  // tagId: string;

  @ForeignKey(() => OutcomeCategory)
  @Column
  categoryId: string;


  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => OutcomeCategory)
  category: OutcomeCategory;

  @BelongsTo(() => Budget)
  budget: Budget;
}
