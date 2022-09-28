import Sidebar from "../partials/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-auto"></div>
    </div>
  );
};

export default Dashboard;
