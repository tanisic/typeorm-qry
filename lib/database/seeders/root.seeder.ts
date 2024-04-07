import { DataSource } from "typeorm";
import { type Seeder, SeederFactoryManager } from "typeorm-extension";
import { Address, Book, Comment, Role, User } from "../entities/index.entity";
import { faker } from "@faker-js/faker";

export default class RootSeeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = factoryManager.get(User);
    const bookFactory = factoryManager.get(Book);
    const roleFactory = factoryManager.get(Role);
    const commentFactory = factoryManager.get(Comment);
    const addressFactory = factoryManager.get(Address);
    const users = await userFactory.saveMany(10);

    for (const user of users) {
      const filteredUsers = users.filter((u) => u.id !== user.id);
      const manager = faker.helpers.arrayElement(filteredUsers);
      user.manager = manager;
      user.books = await bookFactory.saveMany(4);
      user.roles = await roleFactory.saveMany(5);
      user.comments = await commentFactory.saveMany(20);
      user.address = await addressFactory.save();
    }
  }
}
