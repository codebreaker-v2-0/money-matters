import { observer } from "mobx-react";
import styles from "./index.module.css";

interface Props {
  value: number;
  type: string;
}

const SummaryCard: React.FC<Props> = ({ value, type }) => {
  const imgUrl =
    type === "credit"
      ? "https://res.cloudinary.com/dojcknl66/image/upload/v1690638036/credit_djp1qe.png"
      : "https://res.cloudinary.com/dojcknl66/image/upload/v1690638036/debit_e5fy45.png";

  return (
    <div className={styles.summaryCard}>
      <div className={styles.content}>
        <p className={styles[type]}>${value.toLocaleString()}</p>
        <p className={styles.type}>{type === "credit" ? "Credit" : "Debit"}</p>
      </div>
      <img src={imgUrl} alt={type === "credit" ? "credit" : "debit"} />
    </div>
  );
};

export default observer(SummaryCard);
