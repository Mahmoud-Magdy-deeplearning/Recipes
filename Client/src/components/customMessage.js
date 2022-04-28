import React from "react";

function CustomMessage(props) {
  const className = props.className || "";
  return (
    <div className="customMsg">
      <h1 className={className}>{props.msg}</h1>
    </div>
  );
}

export default CustomMessage;
