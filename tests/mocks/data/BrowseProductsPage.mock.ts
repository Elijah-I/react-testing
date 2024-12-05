type Skeleton = {
  role: string;
  name: RegExp;
};

export const errorText: RegExp = /error/i;
export const allOptionText: RegExp = /all/i;

export const categoriesSkeleton: Skeleton = {
  role: "progressbar",
  name: /categories/i
};

export const productsSkeleton: Skeleton = {
  role: "progressbar",
  name: /products/i
};
