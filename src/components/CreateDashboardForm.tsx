import { useState } from 'react';
import { useTaskManager } from '../context/TaskManagerContext';

const CreateDashboardForm = () => {
    const { createDashboard } = useTaskManager(); 
  const [dashboardTitle, setDashboardTitle] = useState(''); 

  const handleCreateDashboard = () => {
    if (dashboardTitle.trim() === '') return; 
    createDashboard(dashboardTitle); 
    setDashboardTitle(''); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={dashboardTitle}
          onChange={(e) => setDashboardTitle(e.target.value)}
          placeholder="Enter dashboard title"
          className="border border-gray-300 rounded-md p-2 mr-2 w-full"
        />
        <button
          onClick={handleCreateDashboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Dashboard
        </button>
      </div>

    </div>
  );
};