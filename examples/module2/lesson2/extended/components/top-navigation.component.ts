import type { Locator, Page } from '@playwright/test';

export class TopNavigation {
  private readonly page: Page;
  private readonly locator: Locator;
  private readonly searchInputLocator: Locator
  private readonly searchButtonLocator: Locator
  private readonly searchResultsLocator: Locator

  constructor(page: Page) {
    this.page = page;
    this.locator = page.locator('#p-search');
    this.searchInputLocator = this.locator.getByLabel('Search Wikipedia');
    this.searchButtonLocator = this.locator.getByRole('button', { name: 'Search' });
    this.searchResultsLocator = this.locator
      .getByRole('listbox')
      .getByRole('option');
  }

  async searchForFirstArticle(term: string) {
    await this.searchInputLocator.fill(term);
    await this.searchResultsLocator.first().waitFor({ state: 'visible' });
    this.searchResultsLocator.first().click();
  }
}
