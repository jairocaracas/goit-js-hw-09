import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const submit = document.querySelector('button[type="submit"]');

submit.addEventListener('click', submitPromise);

function submitPromise(e) {
  e.preventDefault();

  if (delay.value <= 0 || step.value <= 0 || amount.value <= 0) {
    Notiflix.Notify.warning(
      'Por favor ingrese un valor correcto en todos los campos'
    );
  } else {
    for (let i = 0; i < Number(amount.value); i++) {
      let delayIncresing = Number(delay.value) + i * Number(step.value);
      createPromise(i + 1, delayIncresing)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
