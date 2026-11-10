
import { useState, useEffect } from "react";

import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/ExpenseCategoryChart";

export default function Dashboard() {

  // ===== 1. STATES =====

  const [transactions, setTransactions] = useState([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");

  // ===== 2. FETCH TRANSACTIONS FROM BACKEND =====

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/transactions"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();

        setTransactions(data);

      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // ===== 3. CALCULATIONS =====

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // ===== 4. ADD TRANSACTION =====

  const handleAdd = async () => {

    if (
      !description.trim() ||
      !amount ||
      Number(amount) <= 0
    ) {
      alert("Please enter a valid description and amount.");
      return;
    }

    const newTransaction = {
      description: description.trim(),
      amount: Number(amount),
      category: category,
      type,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        }
      );

      const result = await response.json();


      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Transaction could not be saved"
        );
      }

      setTransactions((prev) => [
        result.data,
        ...prev
      ]);

      setDescription("");
      setAmount("");
      setCategory("Food");

      alert("Transaction saved successfully!");

    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Transaction save nahi hua. Please try again.");
    }
  };

  // ===== 5. UI =====

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Good morning, Priya! 👋
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <SummaryCard
          title="Total Income"
          amount={totalIncome.toLocaleString("en-IN")}
          change="+12%"
          bg="bg-green-50"
        />

        <SummaryCard
          title="Total Expense"
          amount={totalExpense.toLocaleString("en-IN")}
          change="+5%"
          bg="bg-red-50"
        />

        <SummaryCard
          title="Current Balance"
          amount={balance.toLocaleString("en-IN")}
          change="+10%"
          bg="bg-blue-50"
        />

      </div>

      {/* Add Transaction Form */}

      <div className="bg-white rounded-xl p-5 shadow-sm mb-6 flex flex-wrap gap-3 items-center">

        {/* Description */}

        <input
          className="border rounded-lg px-3 py-2 text-sm"
          placeholder="Description (e.g. Food shopping)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category Dropdown */}

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        {/* Amount */}

        <input
          className="border rounded-lg px-3 py-2 text-sm w-32"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Transaction Type */}

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Add Button */}

        <button
          onClick={handleAdd}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600"
        >
          + Add
        </button>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <IncomeExpenseChart
          transactions={transactions}
        />

        <ExpenseCategoryChart
          transactions={transactions}
        />

      </div>

      {/* Transaction Table */}

      <TransactionList
        transactions={transactions}
      />

    </div>
  );
}
