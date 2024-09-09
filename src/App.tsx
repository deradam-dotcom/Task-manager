import { CreateDashboardForm } from "./components/CreateDashboardForm";
import Dashboard from "./components/Dashboard";
import { useTaskManager } from "./context/TaskManagerContext";
import "./index.css";

export const App = () => {
  const { dashboards } = useTaskManager();

  return (
    <>
      <div className="flex flex-col justify-start items-center mt-10 h-[200px]">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <CreateDashboardForm />
      </div>
      <div className="px-8 mt-20 flex flex-col md:flex-row flex-wrap space-y-4 space-x-0 md:gap-x-4 md:space-y-0 gap-y-4">
        {dashboards.map((dashboard) => (
          <Dashboard key={dashboard.id} dashboardId={dashboard.id} />
        ))}
      </div>
    </>
  );
};

export default App;
