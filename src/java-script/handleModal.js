const readyRenderingUl = document.querySelector('ul');
const photoModalDom = document.querySelector('.photoModal');

const modalImgListener = readyRenderingUl.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    const srcFullPhoto = e.target.dataset.set;
    const altTextPhotoFull = e.target.alt;
    photoModalDom.setAttribute('src', `${srcFullPhoto}`);
    photoModalDom.setAttribute('alt', `${altTextPhotoFull}`);
    photoModalDom.classList.remove('remove-before-modal');
    photoModalDom.classList.add('remove-after-modal');
    return;
  }

  photoModalDom.setAttribute('src', ``);
  photoModalDom.setAttribute('alt', ``);
  photoModalDom.classList.add('remove-before-modal');
  photoModalDom.classList.remove('remove-after-modal');
});

export { readyRenderingUl, photoModalDom, modalImgListener };
