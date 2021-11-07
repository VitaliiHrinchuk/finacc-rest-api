import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Budget } from "../budget/budget.model";

@Table({
  timestamps: true
})
export class User extends Model {

  @Column({ primaryKey: true, autoIncrement: false })
  id: string;

  @Column
  email: string;

  @Column
  pass_hash: string

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => Budget)
  budgets: Budget[];
}
