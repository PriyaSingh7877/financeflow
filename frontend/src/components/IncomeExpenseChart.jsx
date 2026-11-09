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

export default function IncomeExpenseChart({ transactions }) {
  const byMonth = {};
  transactions.forEach((t) => {
    const month = t.date.split(" ")[1]; // "14 Apr 2025" -> "Apr"
    if (!byMonth[month]) byMonth[month] = { month, income: 0, expense: 0 };
    if (t.type === "Income") byMonth[month].income += t.amount;
    else byMonth[month].expense += t.amount;
  });
  const data = Object.values(byMonth);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="font-semibold mb-4">Monthly Income vs Expense</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#34a87a" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ff6b81" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}