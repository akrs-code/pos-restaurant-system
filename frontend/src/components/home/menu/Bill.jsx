import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPrice, clearCart } from "../../../redux/slices/cartSlice";
import { removeCustomer } from "../../../redux/slices/customerSlice";
import { addOrder, updateTable } from "../../../https";
import { enqueueSnackbar } from "notistack";
import CashCalculatorModal from "../../dashboard/CashCalculatorModal";
import { useQueryClient } from "@tanstack/react-query";

const Bill = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const cart = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.customer);
  const total = useSelector(getTotalPrice);

  const [openCalculator, setOpenCalculator] = useState(false);

  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalWithTax = total + tax;

  const handleConfirmCash = async (cash, change) => {
    if (!customer.customerName || !customer.tableId) {
      enqueueSnackbar("Customer or table not selected", { variant: "warning" });
      return;
    }

    if (!cart.length) {
      enqueueSnackbar("Cart is empty", { variant: "warning" });
      return;
    }

    try {
      const payload = {
        customerDetails: {
          name: customer.customerName,
          guests: customer.guests,
        },
        table: customer.tableId,
        items: cart.map((item) => ({
          name: item.name,
          price: item.pricePerQuantity || item.price,
          quantity: item.quantity,
        })),
        bills: {
          total,
          tax,
          totalWithTax,
          cashReceived: cash,
          change,
        },
        paymentMethod: "Cash",
        orderStatus: "Pending",
      };

      const res = await addOrder(payload);
      const orderId = res?.data?.order?._id || res?.data?._id;

      if (orderId) {
        await updateTable(customer.tableId, {
          status: "Occupied",
          currentOrder: orderId,
        });
      }

      dispatch(clearCart());
      dispatch(removeCustomer());
      queryClient.invalidateQueries(["orders"]);

      enqueueSnackbar("Cash payment successful!", { variant: "success" });
      setOpenCalculator(false);
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Payment failed",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="px-4 py-2">
      {/* Items */}
      <div className="flex justify-between mb-2">
        <p className="text-xs text-gray-400">Items ({cart.length})</p>
        <p className="text-white">{total.toFixed(2)}</p>
      </div>

      {/* Tax */}
      <div className="flex justify-between mb-2">
        <p className="text-xs text-gray-400">Tax ({taxRate}%)</p>
        <p className="text-white">{tax.toFixed(2)}</p>
      </div>

      {/* Total */}
      <div className="flex justify-between mb-4">
        <p className="text-xs text-gray-400">Total</p>
        <p className="text-white font-bold">{totalWithTax.toFixed(2)}</p>
      </div>

      {/* Cash Button */}
      <button
        onClick={() => setOpenCalculator(true)}
        className="w-full py-3 bg-[#02ccaa] text-white rounded-lg font-semibold hover:bg-[#03d9b2] transition"
      >
        Cash
      </button>

      {/* Calculator Modal */}
      <CashCalculatorModal
        open={openCalculator}
        onClose={() => setOpenCalculator(false)}
        totalWithTax={totalWithTax}
        onConfirm={handleConfirmCash}
      />
    </div>
  );
};

export default Bill;
