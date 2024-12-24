import type { Locator, Page } from '@playwright/test';
import { URLs } from '../utils/constants';

export class HelpDeskPage {
  private readonly page: Page;
  private readonly url = URLs.HELP_DESK;
  private readonly searchFrequentlyAskedQuestionsInput: Locator;
  private readonly searchFrequentlyAskedQuestionsSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFrequentlyAskedQuestionsInput = page
        .locator('form')
        .filter({ hasText: 'Search the frequently asked' })
        .getByRole('textbox');
    this.searchFrequentlyAskedQuestionsSubmitButton = page
        .getByRole('button', { name: 'Search the frequently asked' });
  }

  navigate() {
    return this.page.goto(this.url);
  }

  async searchFrequentlyAskedQuestions(term: string) {
    await this.searchFrequentlyAskedQuestionsInput.fill(term);
    return this.searchFrequentlyAskedQuestionsSubmitButton.click();
  }
}
