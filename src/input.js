import React from 'react';

const Input = ({ value, onChange, defaultValue = '' }) => {
  return (
    <input 
      type="text" 
      value={value} 
      defaultValue={defaultValue}
      onChange={onChange} 
    />
  );
};

export default Input;
