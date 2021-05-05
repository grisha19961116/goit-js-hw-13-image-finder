import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import menuTemplate from '../templates/gallery.hbs';
import apiService from './apiService.js';
import { renderWithButton, switchBtn } from './handleBtn.js';
import { readyRenderingUl } from './handleModal.js';
import { inputInFormDom, formDom } from './handleInput.js';

let debounce = require('lodash.debounce');
let searchPage = 1;

function renderFn() {
  const searchWord = inputInFormDom.value.trim().toLocaleLowerCase();
  if (searchWord === '') {
    return switchBtn(false, 'field must filed');
  }
  apiService
    .getFullRequest(searchWord, searchPage)
    .then(({ total, hits }) => {
      if (hits.length % 4 != 0) return;
      if (total === 0) {
        inputInFormDom.value = '';
        switchBtn(false, "we don't have photo with this name.");
        return;
      }
      readyRenderingUl.insertAdjacentHTML('beforeend', menuTemplate(hits));
      const viewPortHeight = document.getElementsByTagName('body')[0]
        .clientHeight;
      window.scrollTo(0, viewPortHeight - 1500);
      return readyRenderingUl;
    })
    .catch(err => console.error(err));
}
formDom.addEventListener('submit', even => {
  even.preventDefault();
});

inputInFormDom.addEventListener(
  'input',
  debounce(() => {
    searchPage = 1;
    readyRenderingUl.innerHTML = '';
    switchBtn(true);
    renderFn();
  }, 500),
);

renderWithButton.addEventListener('click', e => {
  searchPage = searchPage + 1;
  renderFn();
});

window.addEventListener(
  'scroll',
  debounce(e => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    if (inputInFormDom.value === '') return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(() => {
        const scrolled = window.scrollY;
        const viewPortHeight = document.getElementsByTagName('body')[0]
          .clientHeight;
        if (scrolled > viewPortHeight - 1498) {
          searchPage = searchPage + 1;
          renderFn();
          return;
        }
      });
    }, options);
    observer.observe(readyRenderingUl);
  }, 1000),
);
