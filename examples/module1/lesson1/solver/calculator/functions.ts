export function add(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

export function subtract(firstNumber: number, secondNumber: number) {
  return firstNumber - secondNumber;
}

export function multiply(firstNumber: number, secondNumber: number) {
  return firstNumber * secondNumber;
}

export function divide(firstNumber: number, secondNumber: number) {
  return secondNumber === 0 ? "Cannot divide by zero" : firstNumber / secondNumber;
}
