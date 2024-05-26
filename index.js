// app.js
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const lengthInput = document.getElementById('length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateButton = document.getElementById('generate');
    const copyButton = document.getElementById('copy');
  
    const MIN_LENGTH = 8;
  
    const randomFunc = {
      lower: () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)],
      upper: () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)],
      number: () => '0123456789'[Math.floor(Math.random() * 10)],
      symbol: () => '!@#$%^&*(){}[]=<>/,.'[Math.floor(Math.random() * '!@#$%^&*(){}[]=<>/,.'.length)]
    };
  
    generateButton.addEventListener('click', () => {
      const length = parseInt(lengthInput.value);
      const hasUpper = uppercaseCheckbox.checked;
      const hasLower = lowercaseCheckbox.checked;
      const hasNumber = numbersCheckbox.checked;
      const hasSymbol = symbolsCheckbox.checked;
  
      if (length < MIN_LENGTH) {
        alert(`Password length should be at least ${MIN_LENGTH} characters`);
        return;
      }
  
      if (!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
        alert('Please select at least one character type');
        return;
      }
  
      const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
      passwordInput.value = password;
    });
  
    copyButton.addEventListener('click', () => {
      const password = passwordInput.value;
      if (!password) return;
  
      navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  
    function generatePassword(length, upper, lower, number, symbol) {
      let generatedPassword = '';
      const typesCount = upper + lower + number + symbol;
      const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(type => Object.values(type)[0]);
  
      if (typesCount === 0) return '';
  
      for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
          const funcName = Object.keys(type)[0];
          generatedPassword += randomFunc[funcName]();
        });
      }
  
      const finalPassword = generatedPassword.slice(0, length);
      return finalPassword;
    }
  });
  