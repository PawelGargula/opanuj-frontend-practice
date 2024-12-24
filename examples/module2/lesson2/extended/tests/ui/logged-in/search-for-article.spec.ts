import { TopNavigation } from '../../../components/top-navigation.component';
import { expect, test } from '../../../fixtures';
import { ArticlePage } from '../../../pages/article.page';
import { MainPage } from '../../../pages/main.page';

test('Search for first article', async ({ page }) => {
    const SEARCHING_TERM = 'playwright';

    // Mock search results
    await page.route('https://en.wikipedia.org/w/rest.php/v1/search/title?q=playwright&limit=10', async (route) => {
        await route.fulfill({ json: require('./searched-articles.json') })
    });

    // Mock article page navigation
    await page.route('https://en.wikipedia.org/w/index.php?title=Special%3ASearch&search=Playwright&wprov=acrw1_0', async (route) => {
        await route.fulfill({
            status: 302,
            body: '<html><head><title>Playwright</title></head><body><main><h1>Playwright</h1></main></body></html>'
        });
    });

    const mainPage = new MainPage(page);
    await mainPage.navigate();

    const topNavigation = new TopNavigation(page);
    await topNavigation.searchForFirstArticle(SEARCHING_TERM);

    const articlePage = new ArticlePage(page);
    await expect(articlePage.getTitle()).toContainText(SEARCHING_TERM, {
        ignoreCase: true
    });
});