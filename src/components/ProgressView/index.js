import { Puff } from "react-loader-spinner";

import styles from "./index.module.css";

const ProgressView = () => (
  <div className={styles.progressView}>
    <Puff
      height="120"
      width="120"
      radius={1}
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default ProgressView;
