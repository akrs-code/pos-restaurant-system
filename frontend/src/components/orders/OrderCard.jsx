import React, { useState, useRef } from "react";
import { FaCheckDouble, FaCircle, FaPrint } from "react-icons/fa";

const OrderCard = ({ order, onUpdateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const receiptRef = useRef();

  if (!order) return null;

  const name = order.customerDetails?.name || "N/A";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const orderStatus = order.orderStatus || "Pending";

  const statusColor =
    orderStatus === "Completed"
      ? "text-green-500 bg-[#2e4a40]"
      : orderStatus === "Processing"
      ? "text-yellow-400 bg-[#383838]"
      : "text-gray-400 bg-[#383838]";

  const handleStatusUpdate = (e) => {
    e.stopPropagation();
    if (onUpdateStatus) onUpdateStatus(order._id);
  };

  // Print receipt handler
  const handlePrint = (e) => {
    e.stopPropagation();
    if (receiptRef.current) {
      const printContent = receiptRef.current.innerHTML;
      const newWin = window.open("", "_blank");
      newWin.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2, h3, p { margin: 5px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #000; padding: 5px; text-align: left; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      newWin.document.close();
      newWin.print();
    }
  };

  return (
    <>
      {/* Order Card */}
      <div
        className="w-full sm:w-[420px] bg-[#262626] p-4 rounded-xl shadow-sm transition hover:shadow-lg hover:bg-[#2e2e2e] cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start gap-4">
          <div className="bg-[#f6b100] text-black font-bold rounded-lg text-lg w-12 h-12 flex items-center justify-center">
            {initials}
          </div>

          <div className="flex justify-between items-start flex-1">
            <div className="flex flex-col">
              <h1 className="text-white text-base sm:text-lg font-semibold">{name}</h1>
              <p className="text-[#ababab] text-xs sm:text-sm">
                #{order._id.slice(-15) || "N/A"} / {order.orderType || "Dine In"}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p
                className={`${statusColor} text-xs sm:text-sm px-2 py-1 rounded-lg font-medium`}
              >
                <FaCheckDouble className="inline mr-1" />
                {orderStatus}
              </p>
              <p className="text-[#ababab] text-xs sm:text-sm">
                <FaCircle
                  className={`inline mr-1 ${
                    orderStatus === "Completed" ? "text-green-500" : "text-yellow-400"
                  }`}
                />
                {orderStatus === "Completed" ? "Ready to serve" : "In progress"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-[#ababab] text-xs sm:text-sm">
          <p>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
          <p>
            {order.items
              ? order.items.reduce((total, item) => total + (item.quantity || 0), 0)
              : 0}{" "}
            Items
          </p>
        </div>

        <hr className="my-4 border-gray-600" />

        <div className="flex items-center justify-between">
          <h1 className="text-white text-base sm:text-lg font-semibold">Total</h1>
          <p className="text-white text-base sm:text-lg font-semibold">
            ₱{order.bills?.totalWithTax || 0}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {orderStatus !== "Completed" && onUpdateStatus && (
            <button
              onClick={handleStatusUpdate}
              className="w-full py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition"
            >
              Mark as Completed
            </button>
          )}
          <button
            onClick={handlePrint}
            className="w-full py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <FaPrint /> Print Receipt
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#262626] p-6 rounded-xl w-[90%] max-w-md relative text-white">
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>
              <strong>Customer:</strong> {order.customerDetails?.name || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>Total:</strong> ₱{order.bills?.total || 0}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x {item.quantity} - ₱{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Receipt */}
      <div className="hidden" ref={receiptRef}>
        <h2>Receipt</h2>
        <p><strong>Order ID:</strong> #{order._id}</p>
        <p><strong>Customer:</strong> {order.customerDetails?.name}</p>
        <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₱{item.price}</td>
                <td>₱{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Total:</strong> ₱{order.bills?.totalWithTax || 0}</p>
      </div>
    </>
  );
};

export default OrderCard;
