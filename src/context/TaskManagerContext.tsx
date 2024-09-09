import React, { createContext, useState, useContext } from 'react';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type Dashboard = {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
};

type TaskManagerState = {
  dashboards: Dashboard[];
  createDashboard: (title: string, color:string) => void;
  updateDashboardTitle: (dashboardId: string, newTitle: string) => void;
  createTask: (dashboardId: string, taskTitle: string) => void;
  updateTaskTitle: (dashboardId: string, taskId: string, newTitle: string) => void; 
  toggleTaskCompletion: (dashboardId: string, taskId: string) => void;
  updateTaskDescription: (dashboardId: string, taskId: string, description: string) => void;
  deleteTask: (dashboardId: string, taskId: string) => void;
  deleteDashboard: (dashboardId: string) => void;
}

const TaskManagerContext = createContext<TaskManagerState | undefined>(undefined);
const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const TaskManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  const createDashboard = (title: string, color:string) => {
    setDashboards([...dashboards, { id: generateUniqueId(), title, color, tasks: [] }]);
  };

  const updateDashboardTitle = (dashboardId: string, newTitle: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? { ...dashboard, title: newTitle }
          : dashboard
      )
    );
  };

  const updateTaskTitle = (dashboardId: string, taskId: string, newTitle: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? {
              ...dashboard,
              tasks: dashboard.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : dashboard
      )
    );
  };

  const createTask = (dashboardId: string, taskTitle: string, taskDescription: string = '') => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? { ...dashboard, tasks: [...dashboard.tasks, { id: generateUniqueId(), title: taskTitle, description: taskDescription, completed: false }] }
          : dashboard
      )
    );
  };

  const toggleTaskCompletion = (dashboardId: string, taskId: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? {
              ...dashboard,
              tasks: dashboard.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : dashboard
      )
    );
  };

  const deleteTask = (dashboardId: string, taskId: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? { ...dashboard, tasks: dashboard.tasks.filter((task) => task.id !== taskId) }
          : dashboard
      )
    );
  };

  const updateTaskDescription = (dashboardId: string, taskId: string, description: string) => {
    setDashboards((prev) =>
      prev.map((dashboard) =>
        dashboard.id === dashboardId
          ? {
              ...dashboard,
              tasks: dashboard.tasks.map((task) =>
                task.id === taskId ? { ...task, description } : task
              ),
            }
          : dashboard
      )
    );
  };
  
  const deleteDashboard = (dashboardId: string) => {
    setDashboards((prev) => prev.filter((dashboard) => dashboard.id !== dashboardId));
  };

  return (
    <TaskManagerContext.Provider
      value={{
        dashboards,
        createDashboard,
        updateDashboardTitle,
        createTask,
        updateTaskTitle,
        updateTaskDescription,
        toggleTaskCompletion,
        deleteTask,
        deleteDashboard,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};

export const useTaskManager = () => {
  const context = useContext(TaskManagerContext);
  if (!context) throw new Error('useTaskManager must be used within TaskManagerProvider');
  return context;
};