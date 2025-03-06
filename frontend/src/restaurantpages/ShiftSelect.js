import React, { useState } from "react";

const ShiftSelect = ({ setShift }) => {
  const [selectedShift, setSelectedShift] = useState("--Select--");

  return (
    <div className="w-auto">
      <select
        className="bg-green-400 rounded-xl p-1 pl-2 text-black text-xs"
        value={selectedShift}
        onChange={(e) => {
          setSelectedShift(e.target.value);
          setShift(e.target.value);
        }}
      >
        <option value="--Select--">--Shift--</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
    </div>
  );
};

export default ShiftSelect;
