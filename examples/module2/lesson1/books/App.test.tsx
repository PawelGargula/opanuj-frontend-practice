// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { expect, test, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App';

afterEach(cleanup);

test('add book', async () => {
    render(<App />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'Book 1');
    await userEvent.type(screen.getByLabelText('Description'), 'Description 1');

    await userEvent.click(screen.getByText('Add Book'));

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
});

test('delete book', async () => {
    render(<App />);
    
    await userEvent.type(screen.getByLabelText('Name'), 'Book 1');
    await userEvent.type(screen.getByLabelText('Description'), 'Description 1');
    await userEvent.click(screen.getByText('Add Book'));

    await userEvent.click(screen.getByText('Remove'));

    expect(screen.queryByText('Book 1')).toBeNull();
    expect(screen.queryByText('Description 1')).toBeNull();
});