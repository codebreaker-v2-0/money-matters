import { GiDeathSkull } from "react-icons/gi";

import BtnPrimary from "../../utilities/BtnPrimary";

import styles from "./index.module.css";

const FailureView = ({ fetchData }) => (
  <div className={styles.failureView}>
    <GiDeathSkull className={styles.icon} />
    <h3>We are having a hard time loading this page.</h3>
    <p>Try Again</p>
    <BtnPrimary type="button" onClick={fetchData}>
      Retry
    </BtnPrimary>
  </div>
);

export default FailureView;
