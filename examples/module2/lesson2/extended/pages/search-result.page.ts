import type { Locator, Page } from '@playwright/test';
import { URLs } from '../utils/constants';

export class SearchResultsPage {
    private readonly page: Page;
    private readonly url = URLs.SEARCH_RESULTS;
    private readonly searchResultList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultList = page.locator('ul.mw-search-results');
    }

    navigate() {
        return this.page.goto(this.url);
    }

    getSearchResults() {
        return this.searchResultList.getByRole('listitem');
    }
}
