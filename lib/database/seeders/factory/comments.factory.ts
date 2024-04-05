import { setSeederFactory } from "typeorm-extension";
import { Comment, CommentKind } from "../../entities/comment";

export const CommentFactory = setSeederFactory(Comment, (faker) => {
  const comment = new Comment();
  comment.kind = faker.helpers.enumValue(CommentKind);
  comment.text = faker.lorem.lines({ min: 1, max: 3 });
  return comment;
});
