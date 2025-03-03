import './styles/styles.scss';
import { int2en, int2ja, CoercionError } from 'int2words';

const input = document.querySelector<HTMLInputElement>('#integer');
const presetButtons = document.querySelectorAll<HTMLButtonElement>('.preset');
const output = {
  english: document.querySelector<HTMLOutputElement>('output[name="english"]'),
  japanese: document.querySelector<HTMLOutputElement>('output[name="japanese"]'),
  error: document.querySelector<HTMLOutputElement>('output[name="error"]'),
};
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

function convert() {
  if (!input || !output.english || !output.japanese || !output.error) {
    throw new Error('Missing HTML elements.');
  };
  try {
    output.english.innerText = int2en(input.value);
    output.error.innerText = '';
  } catch (error) {
    output.english.innerText = '';
    output.japanese.innerText = '';
    if (error instanceof CoercionError) {
      output.error.innerText = error.message;
    }
    throw error;
  }
  output.japanese.innerText = int2ja(input.value);
}

if (!input) {
  throw new Error('Missing <input> element.');
};

convert();
input.addEventListener('input', convert);
presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.value;
    input.dispatchEvent(new Event('input'));
    if (!isTouchDevice) {
      input.focus();
    }
  });
});
