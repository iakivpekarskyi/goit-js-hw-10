import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  const countryName = searchBox.value.trim();
  if (countryName === '') {
    clearMarkup();
  }

  fetchCountries(countryName).then(countries => {
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1) {
      countryCardMarkup();
    } else {
      countryListMarkup();
    }
  });
}



function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}



function countryCardMarkup(countries) {
  const countryMarkup = countries.map(
    country => `
          <div class="card">
  <img src="${country.flags.svg}" alt="${country.name.official}">
  </div>
  <div class="info-card">
    <h1 class="name">Name:${country.name.official}</h1>
    <p class="capital">Capital:${country.capital}</p>
    <p class="population">Population:${country.population}</p>
    <p class="languages">Languages:${country.languages}</p>
    <p>Map??????????</p>
  </div>
  `
  );
  countryCard.innerHTML = countryMarkup;
}



function countryListMarkup(countries) {
  const listMarkup = countries.map(
    country => `
 <li class="country-list__item">
    <img class="country-list__flags" src="${country.flags.svg}" alt="${country.name.official}" width="25" />
    <h2 class="country-list__name">${country.name.official}</h2>
  </li> `
  );
  countryList.innerHTML = listMarkup;
}
