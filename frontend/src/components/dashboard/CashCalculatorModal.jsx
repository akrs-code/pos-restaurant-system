import React, { useState } from "react";

const keypad = [
  "7", "8", "9",
  "4", "5", "6",
  "1", "2", "3",
  "0", ".", "⌫",
];

const CashCalculatorModal = ({ open, onClose, totalWithTax, onConfirm }) => {
  const [cash, setCash] = useState("");

  if (!open) return null;

  const cashAmount = parseFloat(cash) || 0;
  const change = cashAmount - totalWithTax;

  const handleKeyPress = (key) => {
    if (key === "⌫") {
      setCash((prev) => prev.slice(0, -1));
    } else {
      setCash((prev) => prev + key);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#1a1a1a] w-[90%] max-w-sm rounded-xl p-4 shadow-lg">
        
        {/* Header */}
        <h2 className="text-white font-semibold text-lg mb-3">
          Cash Payment
        </h2>

        {/* Display */}
        <div className="bg-black rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Total</span>
            <span>₱{totalWithTax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>Cash</span>
            <span className="text-white">₱{cash || "0.00"}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Change</span>
            <span className={`font-bold ${change >= 0 ? "text-[#02ccaa]" : "text-red-400"}`}>
              ₱{change.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {keypad.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="py-3 bg-[#2a2a2a] text-white rounded-lg text-lg hover:bg-[#333]"
            >
              {key}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-600 rounded-lg text-white"
          >
            Cancel
          </button>

          <button
            disabled={change < 0}
            onClick={() => onConfirm(cashAmount, change)}
            className="flex-1 py-3 bg-[#02ccaa] rounded-lg text-white font-semibold disabled:opacity-40"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashCalculatorModal;
