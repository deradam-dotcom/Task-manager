import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { useTaskManager } from "../context/TaskManagerContext";
import TaskCard from "./TaskCard";
import TextInput from "./TextInput";

type DashboardProps = {
  dashboardId: string;
};

const Dashboard: React.FC<DashboardProps> = ({ dashboardId }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const { dashboards, createTask, deleteDashboard } = useTaskManager();

  const dashboard = dashboards.find((d) => d.id === dashboardId);

  const handleCreateTask = () => {
    if (taskTitle.trim() !== "") {
      createTask(dashboardId, taskTitle);
      setTaskTitle("");
    }
  };

  const deleteCurrentDashboard = (dashboardId: string) => {
    return () => {
      deleteDashboard(dashboardId);
    };
  };

  if (!dashboard) return <p>Dashboard not found!</p>;

  return (
    <div className="flex w-fit flex-col p-4 bg-white rounded-lg border-2 border-grey-200">
      <div className="flex justify-between items-start">
        <h2
          className="text-xl w-fit px-4 py-1 rounded-lg text-white font-bold mb-4"
          style={{
            backgroundColor: dashboard.color ? dashboard.color : "#000000",
          }}
        >
          {dashboard.title}{" "}
        </h2>
        <CircleX
          color="#6b7280"
          className="cursor-pointer"
          onClick={deleteCurrentDashboard(dashboardId)}
        />
      </div>

      <div className="space-y-2">
        {dashboard.tasks.map((task) => (
          <TaskCard key={task.id} taskId={task.id} dashboardId={dashboard.id} />
        ))}
      </div>
      <div className="mt-4">
        <TextInput
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border px-4 py-2 rounded-md outline-none w-full md:w-auto focus:border-blue-500"
          placeholder="New Task"
        />
        <button
          onClick={handleCreateTask}
          className="md:ml-2 md:mt-0 px-4 py-2 mt-2 w-full md:w-auto bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
