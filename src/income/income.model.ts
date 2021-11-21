import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { IncomeCategory } from "../income-category/income-category.model";
import { Budget } from "../budget/budget.model";

@Table({
  timestamps: true
})
export class Income extends Model {
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

  @ForeignKey(() => IncomeCategory)
  @Column
  categoryId: string;


  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => IncomeCategory)
  category: IncomeCategory;

  @BelongsTo(() => Budget)
  budget: Budget;
}
