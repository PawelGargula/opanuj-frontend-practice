// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GuessPassword } from './GuessPassword';
import { levels } from '../data/levels';

afterEach(cleanup);

vi.stubGlobal('alert', vi.fn());

const setCurrentLevel = vi.fn();

describe('(GPT-4) GuessPassword level 0', () => {
  beforeEach(() => {
    render(<GuessPassword currentLevel={0} setCurrentLevel={setCurrentLevel} />);
  });

  it('displays an error message for incorrect password', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, 'wrong password');
    await userEvent.click(submitButton);

    expect(screen.getByText(/niepoprawne hasło/i)).toBeInTheDocument();
  });

  it('does not display an error message when the input is correct', async () => {
    const correctPassword = levels[0].password;
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, correctPassword);
    await userEvent.click(submitButton);

    expect(screen.queryByText(/niepoprawne hasło/i)).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.');
  });

  it('clears the error message after inputting correct password following a mistake', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, 'wrong');
    await userEvent.click(submitButton);
    expect(screen.getByText(/niepoprawne hasło/i)).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, levels[0].password);
    await userEvent.click(submitButton);

    expect(screen.queryByText(/niepoprawne hasło/i)).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.');
  });

  it('initializes with an empty input field', () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    expect(passwordInput).toHaveValue('');
  });

  it('trims the password input before validation', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, '  pickle rick  ');
    await userEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.');
  });

  it('validates the password case-insensitively', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, levels[0].password.toUpperCase());
    await userEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.');
  });

  it('does not display an error message before any submission', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);

    await userEvent.type(passwordInput, 'wrong password');
    expect(screen.queryByText(/niepoprawne hasło/i)).toBeNull();
  });

  it('displays the error message only once despite multiple incorrect submissions', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, 'wrong password');
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);

    expect(screen.queryAllByText(/niepoprawne hasło/i).length).toBe(1);
  });

  it('handles form submission with Enter key', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    await userEvent.type(passwordInput, 'pickle rick{enter}');
    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.');
  });

  it('preserves input value after failed submission', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    await userEvent.type(passwordInput, 'wrong password');
    await userEvent.click(screen.getByText(/zgadnij/i));
    expect(passwordInput).toHaveValue('wrong password');
  });

  it('calls setCurrentLevel when password is correct', async () => {
    const passwordInput = screen.getByLabelText(/hasło/i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, levels[0].password);
    await userEvent.click(submitButton);

    expect(setCurrentLevel).toHaveBeenCalled();
  });

  it('shows regular message on non-last level completion', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, levels[0].password);
    await userEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Brawo! Zgadłeś hasło. Zostanie teraz wyświetlony kolejny poziom.");
  });

  it('clears input after successful password submission', async () => {
    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, levels[0].password);
    await userEvent.click(submitButton);

    expect(passwordInput).toHaveValue('');
  });
});

describe('(GPT-4) GuessPassword last level', () => {
  it('shows different message on last level completion', async () => {
    const setCurrentLevel = vi.fn();
    render(<GuessPassword currentLevel={levels.length - 1} setCurrentLevel={setCurrentLevel} />);

    const passwordInput = screen.getByPlaceholderText(/wpisz hasło.../i);
    const submitButton = screen.getByRole('button', { name: /zgadnij/i });

    await userEvent.type(passwordInput, levels[levels.length - 1].password);
    await userEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Brawo! Zgadłeś hasło. Gratulacje! Ukończyłeś wszystkie poziomy.");
  });

});

// describe('(Copilot first try) GuessPassword', () => {
//   it('renders without crashing', () => {
//     render(<GuessPassword currentLevel={0} setCurrentLevel={() => {}} />);
//     const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//     expect(passwordInput).toBeInTheDocument();
//   });

//   it('displays error message when password is incorrect', async () => {
//     render(<GuessPassword currentLevel={0} setCurrentLevel={() => {}} />);
//     const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//     const submitButton = screen.getByText('Zgadnij');

//     userEvent.type(passwordInput, 'wrong password');
//     userEvent.click(submitButton);

//     const errorMessage = await screen.findByText(
//       'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
//     );
//     expect(errorMessage).toBeInTheDocument();
//   });

//   it('does not display error message when password is correct', async () => {
//     render(<GuessPassword currentLevel={0} setCurrentLevel={() => {}} />);
//     const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//     const submitButton = screen.getByText('Zgadnij');

//     userEvent.type(passwordInput, levels[0].password);
//     userEvent.click(submitButton);

//     const errorMessage = screen.queryByText(
//       'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
//     );
//     expect(errorMessage).not.toBeInTheDocument();
//   });

//   it('displays error message when password is empty', async () => {
//     render(<GuessPassword currentLevel={0} setCurrentLevel={() => {}} />);
//     const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//     const submitButton = screen.getByText('Zgadnij');

//     await userEvent.click(submitButton);

//     const errorMessage = await screen.findByText(
//       'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
//     );
//     expect(errorMessage).toBeInTheDocument();
//   });

//   // it('displays success message when password is correct', async () => {
//   //   const { container } = render(<GuessPassword />);
//   //   const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//   //   const submitButton = screen.getByText('Zgadnij');

//   //   userEvent.type(passwordInput, levels[0].password);
//   //   await userEvent.click(submitButton);

//   //   const successMessage = container.querySelector('alert');
//   //   expect(successMessage).toBeInTheDocument();
//   // });

//   it('ignores case when checking password', async () => {
//     render(<GuessPassword currentLevel={0} setCurrentLevel={() => {}} />);
//     const passwordInput = screen.getByPlaceholderText('Wpisz hasło...');
//     const submitButton = screen.getByText('Zgadnij');

//     userEvent.type(passwordInput, levels[0].password);
//     userEvent.click(submitButton);

//     const errorMessage = screen.queryByText(
//       'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
//     );
//     expect(errorMessage).not.toBeInTheDocument();
//   });
// });