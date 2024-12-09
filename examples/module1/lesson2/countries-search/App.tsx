import { useState } from 'react';
import { FilterType, SortOrder } from './types';
import FilterBySelector from './searching/filter-by-selector';
import SortBySelector from './searching/sort-by-selector';
import SearchInput from './searching/search-input';
import { CountryCard } from './card/country-card';
import Pager from './paging/pager';
import { useCountriesSearch } from './hooks/use-countries-search';

const PAGE_SIZE = 6;

const App = () => {
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.Name);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<SortOrder>(SortOrder.Alphabetical);
  const [pageNumber, setPageNumber] = useState(1);
  const { countries, isLoading, error } = useCountriesSearch(searchText, filterBy);

  const handleFilterByChange = (newFilterBy: FilterType) => {
    setFilterBy(newFilterBy);
    setPageNumber(1);
  };

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
    setPageNumber(1);
  };

  const itemsCount = countries.length;
  
  countries.sort((a, b) => {
    if (sortBy === SortOrder.Alphabetical) {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortBy === SortOrder.Population) {
      return b.population - a.population;
    }
    return 0;
  });

  const countriesOnPage = countries.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
  return (
    <>
      <div className='w-full flex justify-between items-center flex-wrap mb-2'>
        <FilterBySelector filterBy={filterBy} setFilterBy={handleFilterByChange} />
        <SortBySelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <SearchInput filterBy={filterBy} searchText={searchText} setSearchText={handleSearchTextChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {countriesOnPage.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </ul>
      {itemsCount > 0 && <Pager pageNumber={pageNumber} setPageNumber={setPageNumber} itemsCount={itemsCount} pageSize={PAGE_SIZE} />}
    </>
  );
};

export default App;
