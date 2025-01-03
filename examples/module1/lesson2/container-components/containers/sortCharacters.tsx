import type { Character } from '../types/Character';

export default function sortCharacters({
    characters,
    sortOption
} : {
    characters: Character[], 
    sortOption: string
}) {
    return [...characters].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'created') {
            return new Date(a.created).getTime() - new Date(b.created).getTime();
        }
        return 0;
    });
}