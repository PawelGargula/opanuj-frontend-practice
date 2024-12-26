import { ZodError } from 'zod';
import { FormSchema } from './models/form';

const form = document.querySelector('#flight-form') as HTMLFormElement;
const errors = document.querySelector('#errors') as HTMLDivElement;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    errors.innerHTML = '';
    FormSchema.parse(Object.fromEntries(formData.entries()));
    errors.innerHTML = '';
    alert('Form is valid');
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach(({message}) => {
        const errorElement = document.createElement('p');
        errorElement.textContent = message;
        errors.appendChild(errorElement);
      });
    }
  }
});
