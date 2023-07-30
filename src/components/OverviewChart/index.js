import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./index.module.css";

const fetchedData = {
  last_7_days_transactions_credit_debit_totals: [
    {
      date: "2023-07-29T00:00:00+00:00",
      sum: 3775,
      type: "debit",
    },
    {
      date: "2023-07-28T00:00:00+00:00",
      sum: 10863,
      type: "debit",
    },
    {
      date: "2023-07-29T00:00:00+00:00",
      sum: 9878,
      type: "credit",
    },
    {
      date: "2023-07-28T00:00:00+00:00",
      sum: 432,
      type: "credit",
    },
    {
      date: "2023-07-30T00:00:00+00:00",
      sum: 43,
      type: "credit",
    },
  ],
};

// const data = fetchedData.last_7_days_transactions_credit_debit_totals.map(
//   (item) => ({
//     date: new Date(item.date).getTime(),
//     credit: item.type === "credit" ? item.sum : 0,
//     debit: item.type === "debit" ? item.sum : 0,
//   })
// );

const data = fetchedData.last_7_days_transactions_credit_debit_totals;
const updatedData = [];
// data.forEach(
//   (item) => {
//     let credit = 0;
//     let debit = 0;
//     if (item.date)
//   }
// );

const dateFormatter = (date) =>
  new Date(date).toLocaleDateString("en-IN", { weekday: "short" });

const OverviewChart = () => {
  return (
    <div className={styles.overviewChart}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={dateFormatter} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="debit" fill="#4D78FF" />
          <Bar dataKey="credit" fill="#FCAA0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
