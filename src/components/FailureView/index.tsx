import { GiDeathSkull } from "react-icons/gi";

import BtnPrimary from "../../common-components/BtnPrimary";

import styles from "./index.module.css";

interface Props {
  fetchData: () => void;
}

const FailureView: React.FC<Props> = ({ fetchData }) => (
  <div className={styles.failureView}>
    <GiDeathSkull className={styles.icon} />
    <h3>We are having a hard time loading this page.</h3>
    <p>Try Again</p>
    <BtnPrimary onClick={fetchData}>Retry</BtnPrimary>
  </div>
);

export default FailureView;
