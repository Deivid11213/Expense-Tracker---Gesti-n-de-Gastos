import React, { useState } from 'react';
import './tailwind-config.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const addTransaction = () => {
    if (description && amount !== 0) {
      const newTransaction = { description, amount };
      setTransactions([...transactions, newTransaction]);
      setDescription('');
      setAmount(0);
    }
  }

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  }

  const calculateTotal = () => {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return Math.floor(total); // Convert total amount to integer
  }

  const numberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="p-2 bg-gray-900 ">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-white">
        RASTREADOR DE GASTOS
      </h1>

      <div className="my-4 ">
        <h2 className="text-xl font-semibold text-white">Agrega una nueva transacción</h2>
        <input
          className="border-b-2 border-gray-300 px-3 py-1 mr-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border-b-2 border-gray-300 px-2 py-1 mr-2"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={addTransaction}
        >
          Add
        </button>
      </div>

      <div className="my-4 text-white">
        <h2 className="text-xl font-bold text-white">Transacciones</h2>
        {transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <div>
              <span className="font-bold text-white">{transaction.description}</span>
              <span className="text-sm text-white">&nbsp;&nbsp;{numberWithCommas(Math.floor(transaction.amount))} Gs</span>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => deleteTransaction(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="my-4 text-white">
        <h2 className="text-xl font-bold text-white">Total Balance</h2>
        <span className="text-2xl font-bold">&nbsp;{numberWithCommas(Math.floor(calculateTotal()))} Gs</span>
      </div>

      <div className="my-4">
        <h2 className="text-xl font-bold text-center text-white"> Historial de gastos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="description" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Cantidad" stroke="#8B5CF6" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="description" stroke="#00f569" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}