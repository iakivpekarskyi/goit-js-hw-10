import '../css/styles.css';
import { countries, fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();
  const countryName = searchBox.value.trim();
  if (countryName === '') {
    clearMarkup();
  }

  fetchCountries(countryName).then(country => {
    if (country.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      clearMarkup();
    };
    if (country.length > 2 & country.length <= 10) {
    // country.flag.push.countryeList;
      clearMarkup();
    }
  });
}

function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  return;
}
