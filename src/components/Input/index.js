import { useState, useEffect } from "react";
import "./Input.css";

const Input = ({ type, name, value, placeholder, input, className }) => {
  const [inputData, setInputData] = useState({});

  //handle keypair of data
  const handleValue = (e) => {
    setInputData({ field: name, value: e.target.value });
  };

  //pass props to parent when state changes
  //excluding undefined fields
  useEffect(() => {
    if (typeof inputData.field !== "undefined") {
      input?.(inputData);
    }
  }, [inputData]);

  //add extra classnames declared
  const classNames = [];
  if (className) classNames.push(className);

  return (
    <div className={`inputWrapper ${type === "textarea" ? "textarea" : ""}`}>
      {/*either display textarea or text input conditionally*/}
      {type === "textarea" ? (
        <textarea
          type="text"
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleValue}
          className={classNames.join(" ")}
        />
      ) : (
        <input
          type="text"
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={handleValue}
          className={classNames.join(" ")}
        />
      )}
    </div>
  );
};

export default Input;
