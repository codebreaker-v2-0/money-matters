import styles from "./FormControl.module.css";

const FormControl = ({ id, label, value, type }) => (
  <li className={styles.formControl}>
    <label htmlFor={id}>{label}</label>
    <input
      value={type === "password" ? "dummy-password" : value}
      type={type}
      disabled
    />
  </li>
);

export default FormControl;
