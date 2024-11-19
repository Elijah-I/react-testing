type Option = {
  label: string;
  value: RegExp;
};

export const selectOptions: Option[] = [
  { label: "New", value: /new/i },
  { label: "Processed", value: /processed/i },
  { label: "Fulfilled", value: /fulfilled/i }
];

export const defaultSelectedIndex = 0;
