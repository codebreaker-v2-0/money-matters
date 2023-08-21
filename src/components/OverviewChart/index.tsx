import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { observer } from "mobx-react";
import { subDays, isSameDay } from "date-fns";

import TransactionItem from "../../store/models/TransactionModel";

import styles from "./index.module.css";

const lineColor = "#718ebf";

const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", { weekday: "short" });
};

const amountFormatter = (amount: number) => {
  if (amount < 1000) return amount.toString();
  return `${Math.round(amount / 10) / 100}k`;
};

const OverviewChart: React.FC<{ allTransactionsData: TransactionItem[] }> = ({
  allTransactionsData,
}) => {
  const today = new Date();

  let data: {
    date: Date;
    credit: number;
    debit: number;
  }[] = [];

  const totalData = {
    credit: 0,
    debit: 0,
  };

  for (let i = 6; i >= 0; i -= 1) {
    data.push({
      date: subDays(today, i),
      credit: 0,
      debit: 0,
    });
  }

  allTransactionsData.forEach((item) => {
    const dateItem = data.find((x) => isSameDay(x.date, new Date(item.date)));

    if (dateItem) {
      if (item.type === "credit") {
        totalData.credit += item.amount;
        dateItem.credit += item.amount;
      } else {
        totalData.debit += item.amount;
        dateItem.debit += item.amount;
      }
    }
  });

  return (
    <div className={styles.overviewChart}>
      <p>
        <span>${totalData.debit.toLocaleString()} </span>
        Debited
        <span> ${totalData.credit.toLocaleString()} </span>
        Credited in this week
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={300}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={dateFormatter}
            tick={{ fill: lineColor }}
            axisLine={{ stroke: lineColor }}
            tickLine={{ stroke: lineColor }}
          />
          <YAxis
            tickFormatter={amountFormatter}
            tick={{ fill: lineColor }}
            axisLine={{ stroke: lineColor }}
            tickLine={{ stroke: lineColor }}
          />
          <CartesianGrid vertical={false} stroke="#F3F3F5" />
          <Bar
            name="Debit"
            dataKey="debit"
            fill="#4D78FF"
            barSize={30}
            radius={10}
          />
          <Bar
            name="Credit"
            dataKey="credit"
            fill="#FCAA0B"
            barSize={30}
            radius={10}
          />
          <Legend align="right" verticalAlign="top" iconType="square" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default observer(OverviewChart);
