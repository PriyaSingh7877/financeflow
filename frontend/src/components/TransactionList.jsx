
export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Recent Transactions</h2>
        <span className="text-sm text-emerald-600 cursor-pointer">
          View all →
        </span>
      </div>

      <table className="w-full text-sm text-left">

        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b last:border-0">

              <td className="py-3">
                {new Date(t.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </td>

              <td>{t.description}</td>

              <td>
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">
                  {t.category}
                </span>
              </td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    t.type === "Income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.type}
                </span>
              </td>

              <td
                className={`text-right font-semibold ${
                  t.type === "Income"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {t.type === "Income" ? "+" : "-"} ₹{" "}
                {Number(t.amount).toLocaleString("en-IN")}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No transactions found.
        </p>
      )}

    </div>
  );
}
