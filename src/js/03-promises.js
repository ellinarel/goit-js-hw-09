import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const form = document.querySelector('.form');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}



form.addEventListener('submit', e => {
  e.preventDefault();
const delay = Number(form.delay.value);
const step = Number(form.step.value);
const amount = Number(form.amount.value);
  
  for (let i = 0; i <= amount; i += 1) {
    const position = i;
    const Promdelay = delay + (i - 1) * step;
    createPromise(position, Promdelay)
      .then(({ position, delay }) => {
        position + 1;
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
  
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`
        );
      })
  }
})



