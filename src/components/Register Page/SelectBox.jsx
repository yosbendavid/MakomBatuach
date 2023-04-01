import React, { useState, useEffect } from 'react';

function SelectBox(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const newOptions = [];
    for (var i = 0; i < props.values.length; i++) {
      newOptions.push(
        <option value={`${props.values[i]}`}> {props.values[i]} </option>
      );
    }
    setOptions(newOptions);
  }, [props.values]);

  return (
    <div className='select-box-item'>
      <label className="select-box-title">{props.title}</label>
      <br />
      <select id={`${props.id}`}>
        <option value="" disabled selected>{props.placeHolder}</option>
        {options}
      </select>
    </div>
  );
}

export default SelectBox;
