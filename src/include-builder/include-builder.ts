import { type ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { type QueryParams } from "../types";

export class IncludeBuilder<T extends ObjectLiteral> {
  private rawQuery: QueryParams;
  private queryBuilder: SelectQueryBuilder<T>;
  private joinedRelations: Set<string>;
  private repository: Repository<T>;

  constructor(
    query: QueryParams,
    queryBuilder: SelectQueryBuilder<T>,
    repository: Repository<T>
  ) {
    this.rawQuery = { ...query };
    this.queryBuilder = queryBuilder;
    this.repository = repository;
    this.joinedRelations = new Set<string>();

    const includes = this.rawQuery.include?.split(",") || [];

    for (const include of includes) {
      const nestedIncludesPaths = include.split(".");
      this.addNestedJoins(nestedIncludesPaths, this.queryBuilder.alias);
    }
  }
  addNestedJoins(relationPaths: string[], alias: string) {
    const [relation, ...remainingPaths] = relationPaths;
    const relationAlias = `${alias}_${relation}`;

    if (!this.joinedRelations.has(relationAlias)) {
      this.queryBuilder.leftJoinAndSelect(
        `${alias}.${relation}`,
        relationAlias
      );
      this.joinedRelations.add(relationAlias);
    }

    const metadata = this.repository.metadata;
    const relationMetadata = metadata.findRelationWithPropertyPath(relation);
    if (
      relationMetadata &&
      relationMetadata.inverseEntityMetadata &&
      remainingPaths.length > 0
    ) {
      this.addNestedJoins(remainingPaths, relationAlias);
    }
  }
}
