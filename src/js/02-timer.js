import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    startBtn: document.querySelector(`[data-start]`),
    daysEl: document.querySelector(`[data-days]`),
    hoursEl: document.querySelector(`[data-hours]`),
    minutesEl: document.querySelector(`[data-minutes]`),
    secondsEl: document.querySelector(`[data-seconds]`),
    timePicker: document.querySelector(`#datetime-picker`),
};
refs.startBtn.disabled = true;
let endDate = null;

flatpickr(refs.timePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
    
            if (selectedDate.getTime() < new Date().getTime()) {
      Notiflix.Report.failure(`Please choose a date in the future`);
      refs.startBtn.disabled = true;
      return;
            }
            Notiflix.Report.success(`It's valide date`)
              endDate = selectedDate;
              refs.startBtn.disabled = false;
        },
});

refs.startBtn.addEventListener('click', onсlick);

function onсlick() {
  const timer = setInterval(() => {
    const resultTime = selectDate();
    if (resultTime <= 0) {
      clearInterval(timer);
      refs.daysEl.textContent = '00';
      refs.hoursEl.textContent = '00';
      refs.minutesEl.textContent = '00';
      refs.secondsEl.textContent = '00';
      return;
    }
    const datatimeComponents = convertMs(resultTime);
    return clockInterface(datatimeComponents);
  }, 1000);
}
function selectDate() {
  const now = new Date().getTime();
  const deltatime = endDate.getTime() - now;
  return deltatime < 0 ? 0 : deltatime;
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function clockInterface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}
