import { type FormEvent, useState } from 'react';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val.toLowerCase() === 'pickle rick', {
    message:
      'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.',
  });

export const GuessPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleGuess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPasswordError('');
      passwordSchema.parse(password);
      alert('Brawo! Zgadłeś hasło.');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setTimeout(() => setPasswordError(error.errors[0].message), 0);
      }
    }
  };

  return (
    <form
      onSubmit={handleGuess}
      className="flex flex-col gap-3 w-96 mx-auto"
      data-testid="guess-form"
    >
      <div className="flex flex-col">
        <input
          aria-label='Hasło'
          id="password"
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wpisz hasło..."
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        Zgadnij
      </button>
      {<div aria-live='polite' className="text-red-400 h-6">{passwordError}</div>}
    </form>
  );
};
