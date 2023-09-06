import { observer } from "mobx-react";
import { SummaryCardContainer, SummaryCardContent } from "./styledComponents";

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
    <SummaryCardContainer tabIndex={0}>
      <SummaryCardContent >
        <div className="m-4">
          <p
            className={`text-3xl font-semibold ${
              type === "credit" ? "text-creditColor" : "text-debitColor"
            }`}
          >
            ${value.toLocaleString()}
          </p>
          <p className="text-[#718ebf] mt-2">
            {type === "credit" ? "Credit" : "Debit"}
          </p>
        </div>
        <img
          src={imgUrl}
          alt=""
        />
      </SummaryCardContent>
    </SummaryCardContainer>
  );
};

export default observer(SummaryCard);
