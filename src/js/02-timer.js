import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.getElementById('datetime-picker');
const start = document.querySelector('[data-start]');
const reset = document.querySelector('[data-reset]');

const daysInput = document.querySelector('[data-days]');
const hoursInput = document.querySelector('[data-hours]');
const minutesInput = document.querySelector('[data-minutes]');
const secondsInput = document.querySelector('[data-seconds]');

let data = {
  dateSelected: null,
  timeInMs: null,
};

const LOCALSTORAGE_KEY = 'timer-date';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Por favor seleeciones una fecha a furturo');
      start.disabled = true;
    } else {
      Notiflix.Notify.success('Fecha configurada');
      start.disabled = false;
      timer = new Date(picker.value).getTime();
      data.dateSelected = picker.value;
      data.timeInMs = timer;
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    }
  },
};

let timer;
let interval;
start.disabled = true;
reset.disabled = true;

flatpickr(picker, options);

start.addEventListener('click', () => {
  Notiflix.Notify.success('Iniciando cuenta regresiva');
  interval = setInterval(countDown, 1000);
  start.disabled = true;
  picker.disabled = true;
  reset.disabled = false;
});

reset.addEventListener('click', () => {
  Notiflix.Notify.warning('Temporizador reiniciado');
  timerFinished();
});

if (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).timeInMs !== null) {
  timer = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).timeInMs;
  picker.value = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY)
  ).dateSelected;

  interval = setInterval(countDown, 1000);
  start.disabled = true;
  reset.disabled = false;
  picker.disabled = true;

  Notiflix.Notify.info('Temporizador retomado');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}

function countDown() {
  const newDate = timer - Date.now();
  const { days, hours, minutes, seconds } = convertMs(newDate);
  daysInput.innerText = days;
  hoursInput.innerText = hours;
  minutesInput.innerText = minutes;
  secondsInput.innerText = seconds;

  if (newDate < 1000) {
    timerFinished();
    Notiflix.Notify.success('Tiempo finalizado');
  }
}

function timerFinished() {
  clearInterval(interval);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  start.disabled = false;
  reset.disabled = true;
  picker.disabled = false;
  daysInput.innerText = '00';
  hoursInput.innerText = '00';
  minutesInput.innerText = '00';
  secondsInput.innerText = '00';
}
