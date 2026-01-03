import React from "react";
import { FaCheckDouble } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

const TableCard = ({ id, name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  
const handleClick = () => {
  if (status === "Occupied") return;
  dispatch(updateTable({ tableId: id })); 
  navigate("/menu");
};



  return (
   <div
    onClick={status === "Occupied" ? null : handleClick} 
    className={`sm:w-[235px] p-4 rounded-lg cursor-pointer ${
    status === "Occupied" ? "opacity-50 cursor-not-allowed bg-gray-700" : "bg-[#262626] hover:bg-[#2c2c2c]"
    }`}
    >
      <div className="flex justify-between gap-2">
        <h1 className="text-white text-xl font-semibold">
          Table {name}
        </h1>
        <span
          className={`px-2 py-1 rounded-lg text-sm ${
            status === "Occupied"
              ? "bg-[#2e4a40] text-green-500"
              : "bg-[#f6bd2e] text-white"
          }`}
        >
          <FaCheckDouble className="inline mr-1" />
          {status === "Occupied" ? "Booked" : "Available"}
        </span>
      </div>


      {initials && (
        <p className="text-xs text-[#ababab] mt-2">
          {initials}
        </p>
      )}
    </div>
  );
};

export default TableCard;
