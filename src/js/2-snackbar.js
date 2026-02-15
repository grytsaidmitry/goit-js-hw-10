import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconSuccess from '../img/icon-success.svg';
import arrowLeft from '../img/arrow.svg';

const form = document.querySelector('.form');

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.show({
        class: 'custom-success-toast',
        title: 'OK',
        message: `Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        layout: 2,
        timeout: 5000,
        close: true,
        closeOnEscape: true,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOut',
        iconUrl: iconSuccess,
        iconColor: '#ffffff',
      });
    })
    .catch(delay => {
      iziToast.show({
        class: 'custom-error-toast',
        title: 'ERROR',
        message: `Rejected promise in ${delay} ms`,
        position: 'topRight',
        layout: 2,
        timeout: 5000,
        close: true,
        closeOnEscape: true,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOut',
        iconUrl: arrowLeft,
        iconColor: '#ffffff',
      });
    });
});
