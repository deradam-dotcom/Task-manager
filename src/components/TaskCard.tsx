import React, { useState } from "react";
import { useTaskManager } from "../context/TaskManagerContext";
import { Trash2 } from "lucide-react";
import { AlignLeft } from "lucide-react";
import { Settings } from "lucide-react";
import { Save } from "lucide-react";
import TextInput from "./TextInput";

type TaskCardProps = {
  taskId: string;
  dashboardId: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ taskId, dashboardId }) => {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [addDescription, setAddDescription] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const {
    dashboards,
    toggleTaskCompletion,
    deleteTask,
    updateTaskTitle,
    updateTaskDescription,
  } = useTaskManager();
  const dashboard = dashboards.find((d) => d.id === dashboardId);
  const task = dashboard?.tasks.find((t) => t.id === taskId);

  if (!task) return null;

  const handleEditTaskTitle = (dashboardId: string, taskId: string) => {
    if (taskTitle) {
      updateTaskTitle(dashboardId, taskId, taskTitle);
    }
    setEditTitle(false);
  };
  const handleEditTaskDescription = (dashboardId: string, taskId: string) => {
    if (taskDescription) {
      updateTaskDescription(dashboardId, taskId, taskDescription);
    } else {
      updateTaskDescription(dashboardId, taskId, "");
    }
    setAddDescription(false);
  };

  const bulletPoints = taskDescription
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
        {editTitle ? (
          <>
            <TextInput
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border px-4 py-2 rounded-md outline-none  focus:border-blue-500"
              placeholder="Edit title..."
            />
            <button
              onClick={() => handleEditTaskTitle(dashboardId, taskId)}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </>
        ) : (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(dashboardId, taskId)}
              className="mr-2"
            />
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>
          </div>
        )}
        <div className="text-red-500 hover:text-red-700 ml-2 flex space-x-2">
          <Settings
            color="black"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setEditTitle(!editTitle)}
          />
          <AlignLeft
            color="black"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setAddDescription(!addDescription)}
          />

          <Trash2
            onClick={() => deleteTask(dashboardId, taskId)}
            color="red"
            className="w-6 h-6"
          />
        </div>
      </div>
      {addDescription ? (
        <div className="inline-flex items-center justify-between shadow-sm p-2 mt-2">
          <textarea
            cols={35}
            rows={3}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="border px-4 py-2 rounded-md  focus:border-blue-500 outline-none"
            placeholder="Add description..."
          />
          <Save
            onClick={() => handleEditTaskDescription(dashboardId, taskId)}
            className="ml-2 p-0 w-6 h-6 cursor-pointer"
          />
        </div>
      ) : bulletPoints && bulletPoints.length > 0 ? (
        <ul className="mt-4 list-disc list-inside">
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : task.description ? (
        <span>{task.description}</span>
      ) : null}
    </div>
  );
};

export default TaskCard;
