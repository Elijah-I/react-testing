import { manyOf, oneOf } from "@mswjs/data";
import type { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import type { PrimaryKey } from "@mswjs/data/lib/primaryKey";

export type TypedDbObject<
  Item,
  OuterKey extends string | undefined = undefined,
  Relation extends "one" | "many" = "one"
> = {
  [Key in keyof Item]: Item[Key] extends infer Value
    ? Key extends "id"
      ? PrimaryKey<Value extends PrimaryKeyType ? Value : number>
      : () => Value
    : never;
} & {
  [key in OuterKey extends string
    ? Relation extends "many"
      ? `${OuterKey}s`
      : OuterKey
    : never]: OuterKey extends string
    ? Relation extends "many"
      ? ReturnType<typeof manyOf<OuterKey>>
      : ReturnType<typeof oneOf<OuterKey>>
    : never;
};
