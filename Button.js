import React from "react";
import "../styles/button.css";

function Button({ type = "button", onClick, children }) {
  return (
    <button className="custom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
