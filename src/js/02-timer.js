// const deadline = new Date('2022-05-25');
// let timerID;
// const refs = {
//     days: document.querySelector('.days'),
//     hours: document.querySelector('.hours'),
//     minutes: document.querySelector('.minutes'),
//     seconds: document.querySelector('.seconds'),
//     startBtn: document.querySelector('button'),
//     stopBtn: document.querySelector('.stop'),
// }
// function timer () {
// const today = Date.now()
// const delta = deadline - today;
// const seconds = Math.floor(delta / 1000 % 60);
// const minutes = Math.floor(delta / 1000 / 60 % 60);
// const hours = Math.floor(delta / 1000 / 60 / 60 % 24)
// const days = Math.floor(delta / 1000 / 60 / 60 / 24); // +

// const formatedSeconds = seconds >= 10 ? seconds : `0${seconds}` ;
// const formatedMinutes = minutes >= 10 ? minutes : `0${minutes}`;
// const formatedHours = hours >= 10 ? hours : `0${hours}`;
// const formatedDays = days >= 10 ? days : `0${days}`;

// refs.days.textContent = formatedDays;
// refs.hours.textContent = formatedHours;
// refs.minutes.textContent = formatedMinutes;
// refs.seconds.textContent = formatedSeconds;
// }

// refs.startBtn.addEventListener('click', () => timerID = setInterval(timer, 1000));
// refs.stopBtn.addEventListener('click', () => clearInterval(timerID));



   
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFunction(selectedDates[0]);
  },
};

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let chosenDate = Date.now();
const isDisabled = true;

refs.startBtn.disabled = isDisabled;
refs.startBtn.addEventListener('click', onStartClick);

const fp = flatpickr(refs.inputEl, options);

function onCloseFunction(date) {
  if (Date.now() > date) {
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = !isDisabled;
    chosenDate = date;
  }
}

function onStartClick() {
  refs.startBtn.disabled = isDisabled;
  fp.destroy();
  refs.inputEl.disabled = isDisabled;
  calculationStart();
}

function calculationStart() {
  setInterval(() => {
    const restTime = convertMs(chosenDate - Date.now());
    markupChange(restTime);
  }, 1000);
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

function markupChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}