
export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm overflow-x-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">
          Recent Transactions
        </h2>

        <span className="text-sm text-emerald-600 cursor-pointer">
          View all →
        </span>
      </div>

      {/* Transactions Table */}
      <table className="w-full text-sm text-left">

        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 px-2">Date</th>
            <th className="py-3 px-2">Description</th>
            <th className="py-3 px-2">Category</th>
            <th className="py-3 px-2">Type</th>
            <th className="py-3 px-2 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr
              key={t._id}
              className="border-b last:border-0 hover:bg-gray-50"
            >

              {/* Date */}
              <td className="py-3 px-2 whitespace-nowrap">
                {new Date(t.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </td>

              {/* Description */}
              <td className="py-3 px-2">
                {t.description}
              </td>

              {/* Category */}
              <td className="py-3 px-2">
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">
                  {t.category}
                </span>
              </td>

              {/* Type */}
              <td className="py-3 px-2">
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

              {/* Amount */}
              <td
                className={`py-3 px-2 text-right font-semibold whitespace-nowrap ${
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

      {/* Empty State */}
      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No transactions found.
        </p>
      )}

    </div>
  );
}
