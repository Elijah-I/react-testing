type FormSelectors = {
  name: { label: RegExp; missingError: RegExp; tooLongError: RegExp };
  price: {
    label: RegExp;
    missingError: RegExp;
    tooLongError: RegExp;
    tooSmallError: RegExp;
    tooBigError: RegExp;
  };
  category: { label: RegExp };
  submit: { label: RegExp; failError: RegExp };
};

export const formSelectors: FormSelectors = {
  name: {
    label: /name/i,
    missingError: /is required/i,
    tooLongError: /must contain at most/i
  },
  price: {
    label: /price/i,
    missingError: /is required/i,
    tooLongError: /must contain at most/i,
    tooSmallError: /must be greater/i,
    tooBigError: /must be less than/i
  },
  category: { label: /category/i },
  submit: { label: /submit/i, failError: /unexpected error/i }
};
