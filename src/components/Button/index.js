import "./Button.scss";

const Button = ({
  children,
  className,
  href,
  disabled,
  text,
  onClick,
  green,
  red,
  icon,
  ...rest
}) => {
  const classNames = ["button"];
  if (className) classNames.push(className);
  if (disabled) classNames.push("disabled");
  if (green) classNames.push("green");
  if (red) classNames.push("red");
  return (
    <div
      className={classNames.join(" ")}
      {...rest}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <p>
        {text}
        {children}
      </p>
      {!!icon ? <img src={icon} /> : ""}
    </div>
  );
};

export default Button;
