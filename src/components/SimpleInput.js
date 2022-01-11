import { useEffect, useState } from 'react';

const EmailValidation = ( EnteredEmail ) =>
{
  var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  
  if(EnteredEmail.match(mailformat)) {
    return true;
  }
  else {
    return false;
  }
};


const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  
  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredEmailIsValid = EmailValidation(enteredEmail.trim());
  const nameInputIsValid = !enteredNameIsValid && enteredNameIsTouched;
  const emailInputIsValid = !enteredEmailIsValid && enteredEmailIsTouched;

  useEffect(() => {
    if(enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    }
    else {
      setFormIsValid(false);
    }
  },[enteredNameIsValid,enteredEmailIsValid]);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  }
  const nameInputBlurHandler = event => {
    setEnteredNameIsTouched(true);
  }
  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  }
  const emailInputBlurHandler = event => {
    setEnteredEmailIsTouched(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();
    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);

    if(!enteredNameIsValid && !enteredEmailIsValid){
      return;
    }

    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameIsTouched(false);
    setEnteredEmailIsTouched(false);
  }
  
  
  const nameInputClasses = nameInputIsValid ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputIsValid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
        type='text' 
        id='name' 
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler}
        value={enteredName}/>
      </div>
      { nameInputIsValid && <p className="error-text">Name must not be empty</p>}
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
        type='text' 
        id='email' 
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}/>
      </div>
      { emailInputIsValid && <p className="error-text">Invalid Email</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
