import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersModel: typeof User,
    private config: ConfigService
  ) {}

  async findUser(email: string): Promise<User | undefined> {
    return this.usersModel.findOne({
      where: {
        email: email
      }
    });
  }

  async checkUserExist(email: string): Promise<boolean> {
    const user: User = await this.usersModel.findOne({
      where: {
        email: email
      }
    });
    return !!user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const passwordHash = await bcrypt.hashSync(password, 12)
    const user: User = await this.usersModel.create({
      id: uuidv4(),
      email: email,
      pass_hash: passwordHash
    });
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersModel.findByPk(id);
  }
}
