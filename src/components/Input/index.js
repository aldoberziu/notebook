import { useState, useEffect } from "react";
import "./Input.css";

const Input = ({ type, name, value, placeholder, input, className }) => {
  const [inputData, setInputData] = useState({});
  const handleValue = (e) => {
    setInputData({ field: name, value: e.target.value });
  };
  useEffect(() => {
    if (typeof inputData.field !== "undefined") {
      input?.(inputData);
    }
  }, [inputData]);

  const classNames = [];
  if (className) classNames.push(className);
  return (
    <div className={`inputWrapper ${type === "textarea" ? "textarea" : ""}`}>
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
