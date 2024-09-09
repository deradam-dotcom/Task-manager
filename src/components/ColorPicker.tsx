import React, { Dispatch, SetStateAction } from 'react';

type ColorPickerProps = {
  colors: string[];
  dashboardColor: string;
  setDashboardColor: Dispatch<SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, dashboardColor, setDashboardColor }) => {
  return (
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
  );
};

export default ColorPicker;