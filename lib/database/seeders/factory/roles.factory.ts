import Role from "../../entities/role.entity";
import { setSeederFactory } from "typeorm-extension";

const RolesFactory = setSeederFactory(Role, (faker) => {
  const role = new Role();
  role.key = faker.string.uuid();
  role.name = faker.person.jobTitle();
  return role;
});
export default RolesFactory;
