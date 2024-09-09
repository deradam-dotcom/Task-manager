import { useEffect, useState } from "react";
import { useTaskManager } from "../context/TaskManagerContext";
import { CirclePlus } from "lucide-react";
import TextInput from "./TextInput";
import ColorPicker from "./Colorpicker";

export const CreateDashboardForm = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [dashboardTitle, setDashboardTitle] = useState<string>("");
  const [dashboardColor, setDashboardColor] = useState<string>("");
  
  const { createDashboard } = useTaskManager();

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

  useEffect(() => {
    if (!showInput) setDashboardColor(""), setDashboardTitle("");
  }, [showInput]);

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
          <div
            className={`flex items-center w-fit mb-1 border border-gray-300 rounded-md p-2 ${focus ? "border-blue-500" : ""}`}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          >
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
          <ColorPicker
            colors={colors}
            dashboardColor={dashboardColor}
            setDashboardColor={setDashboardColor}
          />
        </div>
      )}
    </>
  );
};
