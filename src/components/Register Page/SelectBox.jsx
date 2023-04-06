import React, { useState, useEffect } from 'react';

const SelectBox = (props) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedValue] = useState('');

  useEffect(() => {
    const newOptions = [];
    for (var i = 0; i < props.values.length; i++) {
      newOptions.push(
        <option key={`${props.values[i]}`} value={`${props.values[i]}`}> {props.values[i]} </option>
      );
    }
    setOptions(newOptions);
  }, [props.values]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div className='select-box-item'>
      <label className="select-box-title">{props.title}:</label>
      <br />
      <select id={`${props.id}`} value={selectedOption} onChange={handleChange}>
        <option value="" disabled defaultValue>{props.placeHolder}</option>
        {options}
      </select>
    </div>
  );
}

export default SelectBox;
