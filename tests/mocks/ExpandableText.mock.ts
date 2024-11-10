export const textLimit: number = 255;

export const shortText: string = "Excepteur incididunt irure esse aute fugiat.";

export const longText: string = "a".repeat(textLimit + 1);
export const truncatedText: string = `${longText.substring(0, textLimit)}...`;

export const showLessText: RegExp = /show less/i;
export const showMoreText: RegExp = /show more/i;
