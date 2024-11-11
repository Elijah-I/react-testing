import SearchBox from "@/components/SearchBox";
import { ComponentProps } from "react";

export const inputPlaceholder: RegExp = /search/i;
export const inputSearchText: string = "search";

export const onChangeArguments: Parameters<
  ComponentProps<typeof SearchBox>["onChange"]
> = [inputSearchText];
