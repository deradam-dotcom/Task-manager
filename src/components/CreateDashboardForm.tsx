import { useState } from "react";
import { useTaskManager } from "../context/TaskManagerContext";
import { CirclePlus } from "lucide-react";
import TextInput from "./TextInput";

export const CreateDashboardForm = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const { createDashboard } = useTaskManager();
  const [dashboardTitle, setDashboardTitle] = useState<string>("");
  const [dashboardColor, setDashboardColor] = useState<string>("");

  const handleCreateDashboard = () => {
    if (dashboardTitle.trim() === "") return;
    createDashboard(dashboardTitle, dashboardColor);
    setDashboardTitle("");
  };

  const colors: string[] = [
    "#ff6347",
    "#4caf50",
    "#1e90ff",
    "#ffeb3b",
    "#e91e63",
    "#6b7280",
  ];

  return (
    <>
      <button
        onClick={() => setShowInput(!showInput)}
        className="bg-blue-500 flex items-center p-2 justify-center w-fit text-white  rounded-md hover:bg-blue-600 space-x-2 mb-2"
      >
        <CirclePlus />
        <span>Add group</span>
      </button>
      {showInput && (
        <div className="flex-col w-fit">
          <div className="flex items-center w-fit mb-1 border border-gray-300 rounded-md p-2 focus:border-blue-500">
            <TextInput
              value={dashboardTitle}
              onChange={(e) => setDashboardTitle(e.target.value)}
              placeholder="Enter group name..."
              className="outline-none focus:none rounded-xl"
            />
            <button
              onClick={handleCreateDashboard}
              className="bg-blue-500 flex items-center px-2 py-[2px] justify-center w-fit text-white  text-sm text-normal rounded-md hover:bg-blue-600 space-x-2"
            >
              Save
            </button>
          </div>
          <div className="border-[1px] border-gray-200 shadow-sm h-fit w-fit rounded-md p-2">
            <span className="text-gray-400 text-[14px]">Color</span>
            <div className="flex flex-wrap mt-2 w-[225px]">
              {colors.map((color) => (
                <label key={color} className="relative mr-[9px] mt-2">
                  <input
                    type="radio"
                    name="dashboardColor"
                    value={color}
                    checked={dashboardColor === color}
                    onChange={() => setDashboardColor(color)}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                    className={`transition-all cursor-pointer flex items-center justify-center rounded-full border-2 border-transparent p-[2px]`}
                    style={{
                      borderColor: dashboardColor === color ? color : "",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center"
                      style={{
                        backgroundColor: color,

                        padding: "2px",
                      }}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
