// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { expect, test, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Form from './form'
import userEvent from '@testing-library/user-event'

afterEach(cleanup);

test('default controls are displayed', () => {
    render(<Form addBook={() => {}}/>);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Add Book')).toBeInTheDocument();
});

test('Name validation works', async () => {
    render(<Form addBook={() => {}}/>);
    
    await userEvent.click(screen.getByText('Add Book'));
    expect(screen.getByText('Name is required')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Name'), 'Book 1');
    await userEvent.click(screen.getByText('Add Book'));
    expect(screen.queryByText('Name is required')).toBeNull();
});