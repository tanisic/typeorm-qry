import { DataSource } from "typeorm";
import { type Seeder, SeederFactoryManager } from "typeorm-extension";
import User from "../entities/user.entity";
import Book from "../entities/book.entity";
import Role from "../entities/role.entity";
import Address from "../entities/address.entity";
import Comment from "../entities/comment.entity";

export default class RootSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(User);
    const bookFactory = factoryManager.get(Book);
    const roleFactory = factoryManager.get(Role);
    const commentFactory = factoryManager.get(Comment);
    const addressFactory = factoryManager.get(Address);
    const users = await userFactory.saveMany(5);

    for (const user of users) {
      user.manager = await userFactory.save();
      user.books = await bookFactory.saveMany(4);
      user.roles = await roleFactory.saveMany(5);
      user.comments = await commentFactory.saveMany(20);
      user.address = await addressFactory.save();
    }

    await dataSource.getRepository(User).save(users);
  }
}
