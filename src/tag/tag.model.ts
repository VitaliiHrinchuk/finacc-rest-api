import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table({
  timestamps: true
})
export class Tag extends Model {

  @Column({ primaryKey: true, autoIncrement: false })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
