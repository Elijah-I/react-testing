import type { PrimaryKeyType } from "@mswjs/data/lib/glossary";
import type { PrimaryKey } from "@mswjs/data/lib/primaryKey";

export type TypedDbObject<Item> = {
  [Key in keyof Item]: Item[Key] extends infer Value
    ? Key extends "id"
      ? PrimaryKey<Value extends PrimaryKeyType ? Value : number>
      : () => Value
    : never;
};
