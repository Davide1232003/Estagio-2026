import classNames from "classnames";

function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={classNames(
        "border border-slate-300 text-black outline-slate-400 px-4 py-2 rounded-md",
        props.className,
      )}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;
