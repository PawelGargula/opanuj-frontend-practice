import type { Locator, Page } from '@playwright/test';
import { URLs } from '../utils/constants';

export class CommunityPortalPage {
  private readonly page: Page;
  private readonly url = URLs.COMMUNITY_PORTAL;
  private readonly helpDesk: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helpDesk = page.getByRole('link', { name: "Help desk" }).nth(1);
  }

  navigate() {
    return this.page.goto(this.url);
  }

  goToHelpDesk() {
    return this.helpDesk.click();
  }
}
