import React, { useState } from 'react';

function TextBox(props){
    const [text, setText] = useState("");
    
    function handleChange(event) {
      const inputText = event.target.value;
      if (inputText.length <= 30) {
        setText(inputText);
        props.onChange(inputText);
      }
    }
// להשתמש באף ליפטינג ולשלוח מלמעלה פונקציה שנותנת בחזרה ערכים
    return(
        <div className='text-box-item'>
            <label className='text-box-title'>{props.title}:</label>
            <br />
            <input
              type={props.type} 
              id={`my-input-${props.id}`} 
              placeholder={`${props.placeHolder}`} 
              value={text} 
              onChange={handleChange} 
            />
        </div>
    );
}

export default TextBox;
