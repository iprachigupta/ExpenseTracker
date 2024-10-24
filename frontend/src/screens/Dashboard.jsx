/* eslint-disable no-unused-vars */
import DashboardProfile from "../components/DashboardProfile";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/toast";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  const [data, setData] = useState({
    monthlyExpenses: 0,
    monthlyIncome: 0,
    income: 0,
    expenses: 0,
    totalOutstanding: 0,
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/dashboard?startDate=${dateRange.startDate.toISOString()}&endDate=${dateRange.endDate.toISOString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      setData({
        monthlyIncome: result.monthlyIncome,
        monthlyExpenses: result.monthlyExpenses,
        income: result.totalIncome,
        expenses: result.totalExpense,
        totalOutstanding: result.totalOutstanding,
      });

      if (result.success) {
        handleSuccess();
      } else {
        handleError(result.error);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-screen p-4 md:p-0">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <Sidebar />
        </div>

        <div className="w-full md:w-3/4">
          <DashboardProfile
            data={data}
            setData={setData}
            fetchDashboardData={fetchDashboardData}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className=""
      />
    </>
  );
}

export default Dashboard;
