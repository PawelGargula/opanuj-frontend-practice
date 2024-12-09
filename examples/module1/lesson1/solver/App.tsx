import { useState } from 'react';
import { add, subtract, multiply, divide } from './calculator/functions';
import Button from './calculator/button';
import convertEmptyToZero from './calculator/empty-to-zero';

const App = () => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);

  const calculate = (func: (firstNumber: number, secondNumber: number) => number | string) => {
    const result = func(convertEmptyToZero(firstNumber), convertEmptyToZero(secondNumber));
    setResult(result);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          aria-label='First number'
          type="number"
          className="rounded-md shadow-md p-4"
          value={firstNumber}
          onChange={(e) => setFirstNumber(parseFloat(e.target.value))}
        />
        <input
          aria-label='Second number'
          type="number"
          className="rounded-md shadow-md p-4"
          value={secondNumber}
          onChange={(e) => setSecondNumber(parseFloat(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <Button onClick={() => calculate(add)}>+</Button>
        <Button onClick={() => calculate(subtract)}>-</Button>
        <Button onClick={() => calculate(multiply)}>*</Button>
        <Button onClick={() => calculate(divide)}>/</Button>
      </div>
      <div>Result: {result}</div>
    </div>
  );
};

export default App;
