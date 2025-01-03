import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { levels } from '../data/levels';

// test('(Copilot) User can guess the password using hints', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   await page.locator('input#password').fill('wrong password');
//   await page.locator('text=Zgadnij').click();

//   await expect(page.locator('.text-red-500')).toHaveText(
//     'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
//   );

//   await page.locator('text=Pokaż podpowiedź').click();
//   await expect(page.locator('[data-testid="hint-text"]')).toHaveText(
//     'Ogórek i Rick połączeni w jedno'
//   );

//   await page.locator('text=Pokaż podpowiedź').click();
//   await expect(page.locator('[data-testid="hint-text"]')).toHaveText(
//     'Hasło to dwa słowa, drugie to imię'
//   );

//   await page.locator('input#password').fill('Pickle Rick');
//   await page.locator('text=Zgadnij').click();

//   page.on('dialog', async (dialog) => {
//     expect(dialog.message()).toBe('Brawo! Zgadłeś hasło.');
//     await dialog.dismiss();
//   });
// });

test('(GPT-4) should guide the user through incorrect guesses, hints, and finally correct guess', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');

  await page.getByPlaceholder('Wpisz hasło...').fill('wrong password');
  await page.getByRole('button', { name: 'Zgadnij' }).click();

  await expect(
    page.getByTestId('password-error')).toHaveText(
    'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
  );

  await page.getByRole('button', { name: 'Pokaż podpowiedź' }).click();

  await expect(page.getByTestId('hint-text')).toHaveText(
    levels[0].hints[0]
  );

  await page.getByRole('button', { name: 'Pokaż podpowiedź' }).click();

  await expect(page.getByTestId('hint-text')).toHaveText(
    levels[0].hints[1]
  );

  await page.getByPlaceholder('Wpisz hasło...').fill(levels[0].password);
  await page.getByRole('button', { name: 'Zgadnij' }).click();

  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await expect(page.getByPlaceholder('Wpisz hasło...')).toHaveValue('');
  await expect(page.getByTestId('hint-text')).toHaveText('');

  await page.getByPlaceholder('Wpisz hasło...').fill('wrong password');
  await page.getByRole('button', { name: 'Zgadnij' }).click();

  await expect(
    page.getByTestId('password-error')).toHaveText(
    'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
  );

  await page.getByRole('button', { name: 'Pokaż podpowiedź' }).click();

  await expect(page.getByTestId('hint-text')).toHaveText(
    levels[1].hints[0]
  );

  await page.getByRole('button', { name: 'Pokaż podpowiedź' }).click();

  await expect(page.getByTestId('hint-text')).toHaveText(
    levels[1].hints[1]
  );

  await page.getByPlaceholder('Wpisz hasło...').fill(levels[1].password);
  await page.getByRole('button', { name: 'Zgadnij' }).click();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Brawo! Zgadłeś hasło. Gratulacje! Ukończyłeś wszystkie poziomy.');
    await dialog.accept();
  });
  
  await expect(page.getByText('Gratulacje! Ukończyłeś wszystkie poziomy.')).toBeVisible();
});

test('should not have any automatically detectable accessibility issues', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/');

  await page.getByPlaceholder('Wpisz hasło...').fill('wrong password');
  await page.getByRole('button', { name: 'Zgadnij' }).click();
  await page.getByRole('button', { name: 'Pokaż podpowiedź' }).click();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});