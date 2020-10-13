
import menuTemplate from '../templates/galery.hbs';
import { alert, error } from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import apiService from './apiService.js';
let debounce = require('lodash.debounce');
const bodyDom = document.querySelector('body');
const formDom = document.querySelector('form');
const inputInFormDom = document.querySelector('input');
const readyRenderingUl = document.querySelector('ul');
const renderWithButton = document.querySelector('.add-button');
const deleteRenderButton = document.querySelector('.delete-button__dom');
const photoModalDom = document.querySelector(".photoModal");
let scrollBefore = 0;
let searchPage = 1;
function renderFn(){
    const searchWord = inputInFormDom.value;
    searchWord.trim();
    if(searchWord === ''){
        error({
            text:"field have tob no empty,please fill it",
            type: 'info' });
            renderWithButton.classList.replace('load-more','load-more__display-none');
            deleteRenderButton.classList.replace('delete-button','delete-button__display-none');
      return;
    }
    apiService.getFullRequest(searchWord,searchPage)
    .then( (ObjectWithDataMarkup) => {
      readyRenderingUl.insertAdjacentHTML('beforeend',menuTemplate(ObjectWithDataMarkup.hits));
      window.scrollTo(0, 10000);
      return readyRenderingUl;
    }).catch(err => {
           error({
                  text:"we don't have photo with this name."
            });
          console.error(err,`something wrong  with server`);
        });
  }
    formDom.addEventListener('submit', even => {
      even.preventDefault()
    });

    inputInFormDom.addEventListener('input',debounce((ev) => {
      const searchWord = inputInFormDom.value;
      searchPage = 1;
      readyRenderingUl.innerHTML = '';
      renderWithButton.classList.replace('load-more__display-none','load-more');
      deleteRenderButton.classList.replace('delete-button__display-none','delete-button');
      alert({
        text:"write name photo which you're wish to find",
        type: 'info' });
        renderFn();
      }, 500 ));
  
    renderWithButton.addEventListener('click',( (even) => {
        searchPage = searchPage + 1;
      renderFn();
    }));
  
  readyRenderingUl.addEventListener('click',((even) => {
      if(even.target.tagName === "IMG"){
        const srcFullPhoto = even.target.dataset.set;
        const altTextPhotoFull = even.target.alt;
        photoModalDom.setAttribute('src',`${srcFullPhoto}`);
        photoModalDom.setAttribute('alt',`${altTextPhotoFull}`);
        photoModalDom.classList.remove('remove-before-modal');
        photoModalDom.classList.add('remove-after-modal');
        return;
         } 
         photoModalDom.setAttribute('src',``);
         photoModalDom.setAttribute('alt',``);
         photoModalDom.classList.add('remove-before-modal');
         photoModalDom.classList.remove('remove-after-modal');
         
        }
      )
    )
    window.addEventListener('scroll', debounce((even) => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
    }
    if(inputInFormDom.value.length > 4){
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          const scrolled = window.scrollY;
          if(scrollBefore > scrolled){
            scrollBefore = scrolled;
            console.log(`up`)
              return;
          } else if((scrolled > scrollBefore)) {
            console.log(`down`)
              scrollBefore = scrolled ;
              searchPage = searchPage + 1;
              renderFn();
              return ;
          }
        })
    }, options)
        observer.observe(readyRenderingUl);
    }
    },3000))
    deleteRenderButton.addEventListener('click', ((even) => {
      readyRenderingUl.innerHTML = '';
      inputInFormDom.value = '';
      renderWithButton.classList.replace('load-more','load-more__display-none');
      deleteRenderButton.classList.replace('delete-button','delete-button__display-none');
    }))











 
