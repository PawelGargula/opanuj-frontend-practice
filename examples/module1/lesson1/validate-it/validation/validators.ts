export const isEmpty = (value: string) => !value;
  
export const isIntiger = (value: string) => Number.isInteger(Number(value));

export const isOddNumber= (value: number) => value % 2 !== 0;

export const isBetweenNumbers = (min: number, max: number, value: number) => value > min && value < max;