import { alert } from '@pnotify/core';
import {
  readyRenderingUl,
  modalImgListener,
  photoModalDom,
} from './handleModal.js';
import { inputInFormDom } from './handleInput.js';

const renderWithButton = document.querySelector('.add-button');
const deleteRenderButton = document.querySelector('.delete-button__dom');
const climbUpButton = document.querySelector('.climb-up-button');
const switchBtn = (flag, warn) => {
  if (!flag) {
    renderWithButton.classList.replace('load-more', 'load-more__display-none');
    deleteRenderButton.classList.replace(
      'delete-button',
      'delete-button__display-none',
    );
    climbUpButton.classList.replace(
      'climb-up-button',
      'climb-up__display-none',
    );
    warn &&
      alert({
        text: warn,
      });
    return;
  }
  if (flag) {
    renderWithButton.classList.replace('load-more__display-none', 'load-more');
    deleteRenderButton.classList.replace(
      'delete-button__display-none',
      'delete-button',
    );
    climbUpButton.classList.replace(
      'climb-up__display-none',
      'climb-up-button',
    );
    return;
  }
};
const deleteBtnListener = deleteRenderButton.addEventListener('click', e => {
  document.removeEventListener('click', modalImgListener);
  photoModalDom.setAttribute('src', ``);
  photoModalDom.setAttribute('alt', ``);
  photoModalDom.classList.add('remove-before-modal');
  photoModalDom.classList.remove('remove-after-modal');
  readyRenderingUl.innerHTML = '';
  inputInFormDom.value = '';
  switchBtn(false);
});

export { renderWithButton, deleteRenderButton, switchBtn, deleteBtnListener };
