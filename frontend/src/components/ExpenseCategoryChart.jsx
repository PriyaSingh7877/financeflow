import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#34d399", "#ef4444", "#94a3b8", "#ec4899"];

export default function ExpenseCategoryChart({ transactions }) {
  const totals = {};
  transactions
    .filter((t) => t.type === "Expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));

  const totalExpense = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="font-semibold mb-4">Expense by Category</h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">Abhi koi expense nahi hai.</p>
      ) : (
        <div className="flex items-center gap-4">
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-1 text-sm">
            {data.map((d) => (
              <li key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}{" "}
                <span className="text-gray-500">{Math.round((d.value / totalExpense) * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}