import type { Country } from '../types';

export const CountryCard = ({ country }: { country: Country }) => {
  console.log(country);
  return (
    <li className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2" data-testid="country-name">{country.name.common}</h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Capital:</span> {country.capital[0]}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Population:</span>{' '}
          <span data-testid="country-population">{country.population.toLocaleString()}</span>
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Currencies: </span>
          {Object.values(country.currencies ?? {})
            .map(currency => `${currency.name} (${currency.symbol})`)
            .join(", ") ?? "no currency"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Languages: </span>
          {Object.values(country.languages).join(", ")}
        </p>
      </div>
    </li>
  );
};