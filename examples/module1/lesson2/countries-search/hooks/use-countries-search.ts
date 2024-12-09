import { useState, useEffect } from 'react';
import { FilterType, type Country } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1';

export function useCountriesSearch(searchText: string, filterBy: FilterType) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchCountries = async () => {
            setIsLoading(true);
            setError(null);

            try {
                let endpoint = `${BASE_URL}/all`;

                if (searchText) {
                    switch (filterBy) {
                        case FilterType.Capital:
                            endpoint = `${BASE_URL}/capital/${searchText}`;
                            break;
                        case FilterType.Currency:
                            endpoint = `${BASE_URL}/currency/${searchText}`;
                            break;
                        case FilterType.Language:
                            endpoint = `${BASE_URL}/lang/${searchText}`;
                            break;
                        case FilterType.Name:
                        default:
                            endpoint = `${BASE_URL}/name/${searchText}`;
                    }
                }

                const response = await fetch(
                    `${endpoint}?fields=name,capital,currencies,languages,flags,population`,
                    { signal: abortController.signal }
                );
                if (!response.ok) {
                    console.error('No countries found');
                    setError('No countries found');
                    setCountries([]);
                } else {
                    const data: Country[] = await response.json();
                    setCountries(data);
                }
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                console.error('Error fetching countries:', error);
                setError('Failed to fetch');
                setCountries([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();

        return () => {
            abortController.abort();
        };
    }, [filterBy, searchText]);

    return { countries, isLoading, error };
}
