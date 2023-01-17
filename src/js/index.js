import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = searchBox.value.trim();
  if (!countryName) {
   countryCard.innerHTML = '';
   countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryCard.innerHTML = '';
        countryList.innerHTML = '';
        return;
      }
      else if (countries.length > 1) {
        countryListMarkup(countries);
        countryCard.innerHTML = '';

      } else {
        countryCardMarkup(countries);
        countryList.innerHTML = '';
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.warning('Oops, there is no country with that name');
    });
}

function countryListMarkup(countries) {
  const listMarkup = countries
    .map(
      country =>
        `<li><img src="${country.flags.svg}" alt="${country.name.official}" width="150" />
    <h2 class="country-list__name">${country.name.official}</h2>
  </li> `
    )
    .join('');
  countryList.innerHTML = listMarkup;
}

function countryCardMarkup(countries) {
  const countryMarkup = countries
    .map(
      country => `
          <div class="country-card">
  <img src="${country.flags.svg}" alt="${country.name.official}" width="300">
  </div>
  <div class="info-card">
    <h1 class="country-name">${country.name.official}</h1>
    <p class="capital">Capital: ${country.capital}</p>
    <p class="population">Population: ${country.population}</p>
    <p class="languages">Languages: ${Object.values(country.languages)}</p>
  </div>
  `
    )
    .join('');
  countryCard.innerHTML = countryMarkup;
}
