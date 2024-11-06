
import { ToastContainer } from 'react-toastify';
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-screen p-4 md:p-0">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <AdminSidebar />
        </div>

        <div className="w-full md:w-3/4">

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

export default AdminDashboard;
