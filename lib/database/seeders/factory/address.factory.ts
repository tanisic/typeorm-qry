import { setSeederFactory } from "typeorm-extension";
import { Address } from "../../entities/index.entity";

export const AddressFactory = setSeederFactory(Address, (faker) => {
  const address = new Address();
  address.city = faker.location.city();
  address.state = faker.location.state();
  address.country = faker.location.country();
  return address;
});
