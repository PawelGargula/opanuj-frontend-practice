import getValidationMessage from "./validation/getValidationMessage.ts";

function main() {
  const input = document.querySelector('input');
  const button = document.getElementById('validation-btn');
  const button2 = document.getElementById('cleanup-btn');
  const result = document.getElementById('result');
  
  if (!input
      || !button
      || !button2
      || !result) {
    return;
  }

  button.addEventListener('click', () => {
    result.textContent = getValidationMessage(input.value);
  });

  button2.addEventListener('click', () => {
    input.value = '';
    result.textContent = '';
  });
}

main();
