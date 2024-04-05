import { Book } from "../../entities";
import { setSeederFactory } from "typeorm-extension";

export const BookFactory = setSeederFactory(Book, (faker) => {
  const book = new Book();
  book.text = faker.lorem.paragraph(5);
  return book;
});
