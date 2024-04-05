import { Role } from "../../entities";
import { setSeederFactory } from "typeorm-extension";

export const RolesFactory = setSeederFactory(Role, (faker) => {
  const role = new Role();
  role.key = faker.datatype.uuid();
  role.name = faker.person.jobTitle();
  return role;
});
