export 
let debounce = require('lodash.debounce');
import menuTemplate from '../templates/galery.hbs';
import { alert, notice, info, success, error, defaultModules } from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import apiService from './apiService.js';
const formDom = document.querySelector('form');
const inputInFormDom = document.querySelector('input');
const readyRenderingUl = document.querySelector('ul');
const renderWithButton = document.querySelector('.add-button');
const deletRenderButton = document.querySelector('.delete-button');
let searchPage = 1;
formDom.addEventListener('submit', even => {
  even.preventDefault()
})
inputInFormDom.addEventListener('input',debounce((ev) => {
  const searchWord = inputInFormDom.value;
   searchPage = 1;
  readyRenderingUl.innerHTML = '';
  renderWithButton.classList.add('.load-more');
  console.log(renderWithButton.classList.add('load-more'))
    apiService.getFullRequest(searchWord,searchPage)
    .then( (ObjectWithDataMarkup) => {
      readyRenderingUl.insertAdjacentHTML('beforeend',menuTemplate(ObjectWithDataMarkup.hits))
      return readyRenderingUl;
    })
  }, 500 ));
  renderWithButton.addEventListener('click',( (even) => {
    const searchWord = inputInFormDom.value;
    if(searchWord === ''){
      return;
    }
    console.log(searchWord);
    searchPage = searchPage + 1;
    apiService.getFullRequest(searchWord,searchPage)
    .then( (ObjectWithDataMarkup) => {
      readyRenderingUl.insertAdjacentHTML('beforeend',menuTemplate(ObjectWithDataMarkup.hits))
      return readyRenderingUl;
    })
  }));
  deletRenderButton.addEventListener('click', ((even) => {
    readyRenderingUl.innerHTML = '';
    renderWithButton.classList.remove('.load-more');
  }))

// console.log(apiService.getFullRequest(searchWord,searchPage))

// const fragment = document.createDocumentFragment();
// const containerDom = document.querySelector('.container');
// const capitalDom = document.querySelector('.capital');
// const populationDom = document.querySelector('.population');
// const languagesDom = document.querySelector('.languages');
// const imgDom = document.querySelector('img');
// const titleDom = document.querySelector('.title');
// const ulForRenderLi = document.querySelector('.list_render');
// const formCountryDom = document.querySelector('.formCountry');
// const stopDefaultBehaviorForm = document.querySelector('form');
// const getValueFromInput = document.querySelector('input');
// capitalDom.textContent = 'Capital : ';
// populationDom.textContent = 'Population :';
// languagesDom.textContent = 'Languages : ';
// stopDefaultBehaviorForm.addEventListener('submit', even => {
//   even.preventDefault();
// });
// const handleInput = document.querySelector('input');
// handleInput.addEventListener('input', debounce((ev) => {
//   ulForRenderLi.innerHTML = '';
//   capitalDom.textContent = 'Capital : ';
//   populationDom.textContent = 'Population :';
//   languagesDom.textContent = 'Languages : ';
//   containerDom.classList.remove('find');
//   formCountryDom.classList.remove('find_country');
//   imgDom.setAttribute('src',"https://www.nwflags.co.uk/ekmps/shops/0ec9a8/resources/design/country_flags_banner_mobile3.jpg");
//   const keyWord = getValueFromInput.value;
//   if(keyWord === ''){
//     return;
//   }
//   const keyRequest = `https://restcountries.eu/rest/v2/name/${keyWord}`;
//   fetchCountries(keyRequest)
//   .then((data) => {
//     const foo = data.reduce((acc,elem ,index) => {
//       acc.push(elem.name,...elem.flag,...elem.capital,...elem.population,...elem.languages,...elem.demonym);
//       const RenderLiDom = document.createElement('li');
//       RenderLiDom.classList.add('list_render_li');
//       RenderLiDom.textContent = elem.name;
//       fragment.appendChild(RenderLiDom);
//       return acc;
//     },[]);

//     if(foo.length >= 36){
//       const myAlert = alert({
//         text:"please write more aim name country",
//         type: 'info'
//   });
//     }
//       if(foo.length === 6){
//         imgDom.removeAttribute('src');
//         imgDom.setAttribute('src',foo[1]);
//         capitalDom.textContent = 'Capital : '+foo[2] ;
//         populationDom.textContent = 'Population : '+foo[3];
//         languagesDom.textContent = 'Languages : ' +foo[4].name;
//         titleDom.textContent = 'Name country which we are searching : '+foo[5];
//         containerDom.classList.add('find');
//         formCountryDom.classList.add('find_country');
//       };
//     ulForRenderLi.appendChild(fragment);
//   })
//   .then( (elem) => {
//   }
//   )
//   .catch(err => {
//     const myError = error({
//             text:"we don't have country with this name."
//       });
      
//     console.error(err,`something wrong  with server`);
//   });
// }, 500 ));


 
