export default function SummaryCard({ title, amount, change, bg }) {
  return (
    <div className={`rounded-xl p-5 ${bg}`}>
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold mt-1">₹ {amount}</h2>
      <p className="text-xs text-green-600 mt-1">{change} vs last month</p>
    </div>
  );
}