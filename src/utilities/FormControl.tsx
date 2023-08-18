import styles from "./FormControl.module.css";

type Props = {
  id: string,
  label: string,
  value: number,
  type: string,
}

const FormControl: React.FC<Props> = ({ id, label, value, type }) => (
  <li className={styles.formControl}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      value={type === "password" ? "dummy-password" : value}
      type={type}
      disabled
    />
  </li>
);

export default FormControl;
