// @vitest-environment jsdom

import { afterEach, describe, expect, test } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Hints } from './Hints';

afterEach(() => {
    cleanup();
});

describe('Hints component', () => {
    test('should render initial state without any hint displayed', () => {
        render(<Hints />);
        const hintText = screen.getByTestId('hint-text');
        expect(hintText).toHaveTextContent('');
    });

    test('should display first hint after clicking button once', async () => {
        const user = userEvent.setup();
        render(<Hints />);
        
        const button = screen.getByRole('button', { name: /pokaż podpowiedź/i });
        await user.click(button);
        
        const hintText = screen.getByTestId('hint-text');
        expect(hintText).toHaveTextContent('Ogórek i Rick połączeni w jedno');
    });

    test('should cycle through all hints when clicking button multiple times', async () => {
        const user = userEvent.setup();
        render(<Hints />);
        
        const button = screen.getByRole('button', { name: /pokaż podpowiedź/i });
        const hintText = screen.getByTestId('hint-text');

        await user.click(button);
        expect(hintText).toHaveTextContent('Ogórek i Rick połączeni w jedno');

        await user.click(button);
        expect(hintText).toHaveTextContent('Hasło to dwa słowa, drugie to imię');

        await user.click(button);
        expect(hintText).toHaveTextContent('Ogórek po angielsku to Pickle');

        await user.click(button);
        expect(hintText).toHaveTextContent('Ogórek i Rick połączeni w jedno');
    });

    test('should render the instruction text', () => {
        render(<Hints />);
        expect(screen.getByText(/Masz problem ze zgadnięciem hasła?/)).toBeInTheDocument();
    });
});