import type { PrimaryKey } from "@mswjs/data/lib/primaryKey";

export type FactoryType<Unit> = {
  [Key in keyof Unit]: Key extends "id"
    ? PrimaryKey<Unit[Key] extends number ? number : string>
    : () => Unit[Key];
};
