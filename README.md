# TypeORM QueryBuilder

`typeorm-qry` provides a fluent interface for building complex TypeORM queries using TypeScript. It aims to simplify the process of constructing queries.

**This package IS NOT production ready!**

## Features

- **Fluent Interface**: Easily construct TypeORM queries using a intuitive query object.
- **Complex filter building**: Easily construct TypeORM queries using a intuitive query object.
- **Dynamic Query Building**: Construct queries dynamically based on runtime conditions and user input.
- **Compatibility**: Seamlessly integrates with existing TypeORM projects and entities.
- **Zero Dependencies**: Minimal yet powerful QueryBuilder!

## TODO

- Filtering
  - [x] simple filtering (all ands)
  - [x] nested relation filtering
  - [x] complex filtering with `or`, `and` and `not` keywords.
  - [ ] write additional regexlike operators
  - [ ] writing tests
- Pagination
  - [x] feature
  - [ ] writing tests
- Sorting
  - [x] simple sort
  - [x] multiple sorts
  - [x] sort by relation (also multiple)
  - [ ] writing tests
- Relation includes
  - [x] simple relation include
  - [x] dot separated nested relation includes
  - [ ] writing tests
- Field selects
  - [ ] simple field select
  - [ ] fields select by relation
  - [ ] writing tests
- [ ] write more examples

## Getting Started

To get started with TypeORM QueryBuilder, follow these steps:

1. **Installation**: Install the package via npm or pnpm or yarn.

```sh
  npm install typeorm-qry
  # or
  pnpm add typeorm-qry
  # or
  yarn add typeorm-qry
```

2. **Write service**: I used `NestJS` as playground. You can use whatever supports TypeORM.

```typescript
import { Repository } from "typeorm";
import { FilterOperand, QueryBuilder, QueryParams } from "typeorm-qry";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  getAll() {
    const query: QueryParams = {
      filter: [
        {
          or: [
            { name: "name", op: FilterOperand.like, val: "matthew" },
            {
              name: "workplaces.name",
              op: FilterOperand.like,
              val: "technician",
            },
          ],
        },
        { name: "partner.id", op: FilterOperand.eq, val: 2 },
      ],
      paginate: {
        page: 1,
        perPage: 10, // Return paginated result
      },
      include: "workplaces.users,partner", // Includes relations workplaces, workplaces.users and partner into result.
      sort: "name,-workplaces.name", // Sort by name ASC and sort relation workplaces by name DESC.
    };

    const qb = new QueryBuilder(query, this.repository);
    return qb.queryBuilder.getMany();
  }
}
```

# License

This package is licensed under the MIT License. See the [ LICENSE ](LICENSE) file for more information.
