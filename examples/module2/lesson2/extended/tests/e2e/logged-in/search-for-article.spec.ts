import { TopNavigation } from '../../../components/top-navigation.component';
import { expect, test } from '../../../fixtures';
import { ArticlePage } from '../../../pages/article.page';
import { MainPage } from '../../../pages/main.page';

test('Search for first article', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.navigate();

    const SEARCHING_TERM = 'playwright';
    
    const topNavigation = new TopNavigation(page);
    await topNavigation.searchForFirstArticle(SEARCHING_TERM);

    const articlePage = new ArticlePage(page);
    await expect(articlePage.getTitle()).toContainText(SEARCHING_TERM, {
        ignoreCase: true
    });
});