import { User } from "../../entities/index.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.isActive = faker.datatype.boolean();
  user.login = faker.internet.userName();
  return user;
});
