import React from 'react';
import { useTaskManager } from '../context/TaskManagerContext';

type TaskCardProps = {
  taskId: string;
  dashboardId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskId, dashboardId }) => {
  const { dashboards, toggleTaskCompletion, deleteTask } = useTaskManager();
  const dashboard = dashboards.find((d) => d.id === dashboardId);
  const task = dashboard?.tasks.find((t) => t.id === taskId);

  if (!task) return null;

  return (
    <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(dashboardId, taskId)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
      </div>
      <button
        onClick={() => deleteTask(dashboardId, taskId)}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
