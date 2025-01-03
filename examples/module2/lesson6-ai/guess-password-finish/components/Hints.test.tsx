// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Hints } from './Hints';
import { levels } from '../data/levels';

afterEach(() => {
    cleanup();
});

describe('Hints component', () => {
    beforeEach(() => {
        render(<Hints currentLevel={0} />);
    });

    test('should render initial state without any hint displayed', () => {
        const hintText = screen.getByTestId('hint-text');
        expect(hintText).toHaveTextContent('');
    });

    test('should display first hint after clicking button once', async () => {
        const user = userEvent.setup();
        
        const button = screen.getByRole('button', { name: /pokaż podpowiedź/i });
        await user.click(button);
        
        const hintText = screen.getByTestId('hint-text');
        expect(hintText).toHaveTextContent(levels[0].hints[0]);
    });

    test('should cycle through all hints when clicking button multiple times', async () => {
        const user = userEvent.setup();
        
        const button = screen.getByRole('button', { name: /pokaż podpowiedź/i });
        const hintText = screen.getByTestId('hint-text');

        for (let i = 0; i < levels[0].hints.length; i++) {
            await user.click(button);
            expect(hintText).toHaveTextContent(levels[0].hints[i]);
        }

        await user.click(button);
        expect(hintText).toHaveTextContent(levels[0].hints[0]);
    });

    test('should render the instruction text', () => {
        expect(screen.getByText(/Masz problem ze zgadnięciem hasła?/)).toBeInTheDocument();
    });
});