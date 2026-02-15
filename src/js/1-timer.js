import '../css/styles.css';
import arrowLeft from '../img/arrow.svg';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

button.disabled = true;

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      const nowDate = new Date();
      if (selectedDate < nowDate) {
        iziToast.show({
          class: 'custom-error-toast',
          message: 'Please choose a date in the future',
          layout: 2,
          timeout: 5000,
          close: true,
          position: 'topRight',
          closeOnEscape: true,
          transitionIn: 'fadeInLeft',
          transitionOut: 'fadeOut',
          iconUrl: arrowLeft,
          iconColor: '#ffffff',
        });
        button.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        button.disabled = false;
        console.log(userSelectedDate);
      }
    }
  },
};

flatpickr(input, options);

button.addEventListener('click', () => {
  input.disabled = true;
  button.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    let diff = userSelectedDate - now;
    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }

    const time = convertMs(diff);
    updateTimer(time);
  }, 1000);
});

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
