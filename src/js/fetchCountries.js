
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filters = '?fields=name.official,capital,population,flags.svg,languages';


export function fetchCountries(countryName) {
  return fetch(`${BASE_URL}${countryName}${filters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .catch(err => console.error(err))
};

