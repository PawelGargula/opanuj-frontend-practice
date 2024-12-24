import type { Locator, Page } from '@playwright/test';

export class MainMenu {
  private readonly page: Page;
  private readonly locator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locator = page.locator('#p-interaction');
  }

  goToCommunityPortal() {
    return this.locator.getByRole('link', { name: 'Community portal' }).click();
  }
}
