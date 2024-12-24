import { expect, test } from '../../../fixtures';
import { HelpDeskPage } from '../../../pages/heklp-desk.page';
import { CommunityPortalPage } from '../../../pages/community-portal.page';
import { SearchResultsPage } from '../../../pages/search-result.page';
import { MainPage } from '../../../pages/main.page';
import { MainMenu } from '../../../components/main-menu.component';

test.beforeEach(async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.navigate();
});

test.describe('Search in help desk', () => {
  test('Search in help desk', async ({ page }) => {
    const SEARCHING_TEXT = 'watchlist';

    const mainMenu = new MainMenu(page);
    await mainMenu.goToCommunityPortal();

    const communityPortal = new CommunityPortalPage(page);
    await communityPortal.goToHelpDesk();

    const helpDesk = new HelpDeskPage(page);
    await helpDesk.searchFrequentlyAskedQuestions(SEARCHING_TEXT);

    const searchResults = new SearchResultsPage(page);
    const listOfSearchResults = searchResults.getSearchResults();
    const count = await listOfSearchResults.count();
    
    for (let i = 0; i < count; i++) {
      const searchResult = await listOfSearchResults.nth(i).textContent();
      expect(searchResult).toContain(SEARCHING_TEXT);
    }
  });
});
