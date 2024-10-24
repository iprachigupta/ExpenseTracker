/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DashboardProfile(props) {
  const { data, setData } = props;


  const incomeChartData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i)); 
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: "Monthly Income (₹)",
        data: data.monthlyIncome, 
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const expensesChartData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i)); 
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }),
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: data.monthlyExpenses,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  return (
    <div className="flex-1 p-4 mt-24 lg:mt-0 md:p-8 h-screen absolute top-0 left-0 md:left-64 right-0">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Hi,</h2>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-6">
        {/* Income Card */}
        <div className="flex flex-col">
          <div className="bg-blue-200 p-4 md:p-5 rounded-lg shadow-zinc-400 shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
              Income :
            </h3>
            <p className="text-xl md:text-2xl font-bold mb-2">
              ₹ {data.income}/-
            </p>
            <div className="bg-white shadow-zinc-400 shadow-md">
              <Line data={incomeChartData} options={options} />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="flex flex-col">
          <div className="bg-blue-200 p-4 md:p-5 rounded-lg shadow-zinc-400 shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
              Expense :
            </h3>
            <p className="text-xl md:text-2xl font-bold mb-2">
              ₹ {data.expenses}/-
            </p>
            <div className=" bg-white p-2 shadow-zinc-400 shadow-md">
              <Line data={expensesChartData} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-20 md:mt-10">
        <div className="bg-blue-200 p-4 md:p-6 rounded-lg shadow-zinc-400 shadow-lg w-full md:w-1/2 md:h-84">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
            Total Outstanding :
          </h3>
          <p className="text-xl md:text-2xl font-bold text-center">
            ₹ {data.totalOutstanding}/-
          </p>
          <div className="bg-white p-2 mt-2 shadow-zinc-400 shadow-md ">
            <Line data={ {...incomeChartData, datasets: [...incomeChartData.datasets, ...expensesChartData.datasets ]}} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProfile;
