
export function fetchCountries(name) {
   const BASE_URL = 'https://restcountries.com/v3.1/name';
   const filters = 'name.official,capital,population,flags.svg,languages';

   return fetch(`${BASE_URL}${name}${filters}`).then(response => {
      if (!response.ok) {
         throw new Error(response.statusText)
      }
      return response.json();
   })
      .then(country => {
         console.log(country)
      
      });
 
} 