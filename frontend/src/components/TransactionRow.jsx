/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const TransactionRow = ({ expense, onEditClick, onDeleteClick }) => {
  return (
    <tr>
      <td className="border px-4 py-2 text-xs md:text-sm">{expense.title}</td>
      <td className="border px-4 py-2 text-xs md:text-sm">{expense.amount}</td>
      <td className="border px-4 py-2 text-xs md:text-sm">{expense.category}</td>
      <td className="border px-4 py-2 text-xs md:text-sm">{expense.description}</td>
      <td className="border px-4 py-2 text-xs md:text-sm">{expense.transactionType}</td>
      <td className="border px-4 py-2 text-xs md:text-sm">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="border px-4 py-2 text-xs md:text-sm flex  space-x-2">
        <button onClick={() => onEditClick(expense)} className="text-green-500" >
          <AiFillEdit />
        </button>
        <button onClick={() => onDeleteClick(expense._id)} className="text-red-500">
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
