import { useState } from 'react'


const useInput = (validator) => {
  const [enteredText, setEnteredText] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const inputChangeHandler = (e) => setEnteredText(e.target.value);
  const inputBlurHandler = () => setIsTouched(true);

  const isValid = validator(enteredText);
  const hasError = !isValid && isTouched;


  const reset = () => {
    setEnteredText('');
    setIsTouched(false);
  }

  return {
    value: enteredText,
    changeHandler: inputChangeHandler,
    blurHandler: inputBlurHandler,
    isValid: isValid,
    hasError: hasError,
    reset: reset
  }
}

export default useInput;
