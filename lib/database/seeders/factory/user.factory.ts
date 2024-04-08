import User from "../../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.isActive = faker.datatype.boolean();
  user.login = faker.internet.userName();
  return user;
});

export default UserFactory;
