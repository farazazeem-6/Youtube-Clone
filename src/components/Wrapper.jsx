const wrapperStyle = {
  padding: "0px 24px 0px 0px",
};

const Wrapper = ({ children }) => {
  return <div style={wrapperStyle}>{children}</div>;
};

export default Wrapper;
