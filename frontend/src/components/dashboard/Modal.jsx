import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";
import { useNavigate } from "react-router-dom";

const CustomerModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    if (!customerData.name) return;

    dispatch(setCustomer(customerData));
    navigate("/tables");
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262626] p-6 rounded-lg w-96 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
          Customer Details
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customerData.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded-lg bg-[#1f1f1f] text-white outline-none"
        />


        <input
          type="number"
          name="guests"
          min={1}
          value={customerData.guests}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-[#1f1f1f] text-white outline-none"
        />

        <button
          onClick={handleProceed}
          className="w-full py-3 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300 transition"
        >
          Proceed to Table Selection
        </button>
      </div>
    </div>
  );
};

export default CustomerModal;
