import React, { useState, useEffect } from 'react';

function SelectBox(props) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const newOptions = [];
    for (var i = 0; i < props.values.length; i++) {
      newOptions.push(
        <option value={`${props.values[i]}`}> {props.values[i]} </option>
      );
    }
    setOptions(newOptions);
  }, [props.values]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className='select-box-item'>
      <label className="select-box-title">{props.title}:</label>
      <br />
      <select id={`${props.id}`} value={selectedValue} onChange={handleChange}>
        <option value="" disabled selected>{props.placeHolder}</option>
        {options}
      </select>
    </div>
  );
}

export default SelectBox;
