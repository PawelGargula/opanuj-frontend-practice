export type Country = {
    name: {
        common: string;
    };
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    population: number;
    languages: {
        [key: string]: string;
    };
    capital: string[];
    flags: {
        alt: string;
        svg: string;
    };
};

export enum FilterType {
    Name = 'name',
    Currency = 'currency',
    Language = 'language',
    Capital = 'capital'
};

export enum SortOrder {
    Alphabetical = 'alphabetical',
    Population = 'population'
};