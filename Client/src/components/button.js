const Button = (props) => {
  const { type, ClassName, backgroundColor, text, onClickAction } = props;
  return (
    <button
      className={ClassName}
      type={type ? type : "button"}
      style={{
        backgroundColor: backgroundColor,
        textDecoration: "none",
        padding: "5px",
        borderRadius: "10px",
      }}
      onClick={onClickAction}
    >
      {text}
    </button>
  );
};
export default Button;
