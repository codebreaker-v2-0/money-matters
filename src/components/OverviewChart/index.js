import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { subDays, isSameDay } from "date-fns";

import styles from "./index.module.css";

const lineColor = "#718ebf";

const dateFormatter = (date) => {
  return new Date(date).toLocaleDateString("en-IN", { weekday: "short" });
};

const amountFormatter = (amount) => {
  if (amount < 1000) return amount;
  return `${Math.round(amount / 10) / 100}k`;
};

const OverviewChart = ({ lastSevenDaysData }) => {
  const today = new Date();

  const data = [];
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

  lastSevenDaysData.forEach((item) => {
    const dateItem = data.find((x) => isSameDay(x.date, new Date(item.date)));

    if (dateItem) {
      dateItem[item.type] += item.sum;

      totalData[item.type] += item.sum;
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

export default OverviewChart;
