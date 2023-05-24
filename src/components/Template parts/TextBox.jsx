import React, { useState } from 'react';
import eyeForPassword from '../../Photos/eyeForPassword.svg';
import eyeForPasswordOff from '../../Photos/eyeForPasswordOff.svg';
import InputCard from './InputCard';
//זה מייצרת את האינפוט טקסט צריך להעביר ערכים נוח ומונע שיכפול, מתאים גם לסיסמה גם טקסט וגם מייל
const TextBox = (props) => {
  const [text, setText] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [className, setClassName] = useState('');


//לשנות את הכתיבה לא לכתוב עם גט אלמנט!
  const showPassword = () => {
    const inputElement = document.getElementById(`my-input-${props.id}`);
    setPasswordVisible(!passwordVisible);
    inputElement.type = passwordVisible ? "password" : "text";
  }

  const handleChange = (event) => {
    setClassName('input-box-selected');
    const inputText = event.target.value;
    if (inputText.length <= 30) {
      setText(inputText);
      props.onChange(inputText);
    }
  }
  return (
    <InputCard className='text-box-item'>
      <label className='text-box-title'>{props.title}:</label>
      <div className='input-wrapper'>
        <input
          type={props.type}
          id={`my-input-${props.id}`}
          placeholder={props.placeHolder}
          onChange={handleChange}
          autoComplete= {props.autoComplete}
          value={props.value}
          className={className}
        />
        {props.type === "password" && (
          <img
            className='password-toggle'
            src={passwordVisible ? eyeForPasswordOff : eyeForPassword}
            alt={passwordVisible ? 'Hide password' : 'Show password'}
            onClick={() => {
              showPassword();
            }}
          />
        )}
      </div>
    </InputCard>
  );
};

export default TextBox;
