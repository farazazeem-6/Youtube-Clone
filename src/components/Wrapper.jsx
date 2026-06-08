const WRAPPER_PADDING_CLASS = "pr-6";

function Wrapper({ children }) {
  return <div className={WRAPPER_PADDING_CLASS}>{children}</div>;
}

export default Wrapper;
