import React from "react";

const wrapperStyle = {
  padding: "0px 24px",
};

const Wrapper = ({ children }) => {
  return <div style={wrapperStyle}>{children}</div>;
};

export default Wrapper;
