import { useField } from "formik";

function NovoInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="forms-group">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? "is-invalid" : ""}
      />
      {meta.error && meta.touched ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default NovoInput;
