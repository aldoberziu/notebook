import { createElement } from "react";
import "./Text.css";

const Text = ({ children, className, text, tag, h1, sh1, bold, ...rest }) => {
  let classNames = [];
  if (h1) {
    classNames = ['h1'];
  }
  if (sh1) {
    classNames = ['sh1'];
  }
  if (bold) classNames.push("bold");
  if (className) classNames.push(className);
  if (!tag) {
    tag = "span";
  }
  const CustomTag = ({ tag, children, ...props }) => {
    return createElement(tag, props, children);
  };
  return (
    <CustomTag {...rest} className={classNames.join(" ")} tag={tag}>
      {text}
      {children}
    </CustomTag>
  );
};

export default Text;
