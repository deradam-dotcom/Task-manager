import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { useTaskManager } from '../context/TaskManagerContext';
import TaskCard from './TaskCard';

type DashboardProps = {
  dashboardId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboardId }) => {
  const { dashboards, createTask , deleteDashboard } = useTaskManager();
  const dashboard = dashboards.find((d) => d.id === dashboardId);

  const [taskTitle, setTaskTitle] = useState<string>('');

  
  const handleCreateTask = () => {
    if (taskTitle.trim() !== '') {
      createTask(dashboardId, taskTitle);
      setTaskTitle('');
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
      <div className='flex justify-between items-start'>
      <h2 className="text-xl w-fit px-4 py-1 rounded-lg text-white font-bold mb-4" style={{ backgroundColor: dashboard.color }}>{dashboard.title} </h2>
      <CircleX color="#6b7280" className='cursor-pointer' onClick={deleteCurrentDashboard(dashboardId)} />
      </div>

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
          className="border px-4 py-2 rounded-md outline-none focus:border-blue-500"
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