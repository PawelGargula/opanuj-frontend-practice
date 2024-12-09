import { useState } from 'react';
import CharacterList from '../components/characters/CharacterList';
import SearchForm from '../components/search/SearchForm';
import SearchTitle from '../components/search/SearchTitle';
import CharacterListItem from '../components/characters/CharacterListItem';
import SearchByName from '../components/search/SearchByName';
import SearchByGender from '../components/search/SearchByGender';
import SortBy from '../components/search/SortBy';
import useCharacters from './useCharacters';
import sortCharacters from './sortCharacters';

function CharacterSearchContainer() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [sortOption, setSortOption] = useState('');

  const characters = useCharacters({ name, gender });
  const sortedCharacters = sortCharacters({characters, sortOption});

  return (
    <>
      <div className="pt-20" />
      <SearchTitle title='Wyszukiwarka postaci Rick and Morty' />
      <div className="pt-8" />
      <SearchForm>
        <SearchByName name={name} setName={setName}/>
        <SearchByGender gender={gender} setGender={setGender} />
        <SortBy sortOption={sortOption} setSortOption={setSortOption} />
      </SearchForm>
      <div className="pt-12" />
      <CharacterList>
        {sortedCharacters.map((character) => (
          <CharacterListItem character={character} key={character.id} />
        ))}  
      </CharacterList>
      <div className="pt-16" />
    </>
  );
}

export default CharacterSearchContainer;
