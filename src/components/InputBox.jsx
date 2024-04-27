import React from "react";

function InputBox({ onChangeEvent, placeholder, title }) {  
    return (
      <div>
        <label htmlFor="inputField">{title}</label>
        <textarea
          id="inputField"
          onChange={(e) => onChangeEvent(e.target.value)} 
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default InputBox;