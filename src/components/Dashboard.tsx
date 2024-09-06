import React, { useState } from 'react';
import { useTaskManager } from '../context/TaskManagerContext';
import TaskCard from './TaskCard';

type DashboardProps = {
  dashboardId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardId }) => {
  const { dashboards, createTask } = useTaskManager();
  const dashboard = dashboards.find((d) => d.id === dashboardId);

  const [taskTitle, setTaskTitle] = useState('');

  if (!dashboard) return <p>Dashboard not found!</p>;

  const handleCreateTask = () => {
    if (taskTitle.trim() !== '') {
      createTask(dashboardId, taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{dashboard.title}</h2>
      <div className="space-y-2">
        {dashboard.tasks.map((task) => (
          <TaskCard key={task.id} taskId={task.id} dashboardId={dashboard.id} />
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border px-4 py-2 rounded-md"
          placeholder="New Task"
        />
        <button onClick={handleCreateTask} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;