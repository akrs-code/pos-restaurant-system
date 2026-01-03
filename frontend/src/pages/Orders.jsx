import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import OrderCard from "../components/orders/OrderCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus, updateTable } from "../https";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");
  const queryClient = useQueryClient();

  // Fetch orders
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res.data; // normalize: { data: [...] }
    },
    onError: () => enqueueSnackbar("Failed to load orders", { variant: "error" }),
  });

  // Complete order & free table
  const completeOrder = async (orderId, tableId) => {
    try {
      await updateOrderStatus(orderId, "Completed");

      if (tableId) {
        await updateTable(tableId, { status: "Available", currentOrder: null });
      }

      // Refresh orders immediately
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["tables"]);

      enqueueSnackbar("Order completed and table freed!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Failed to complete order", { variant: "error" });
    }
  };

  const filteredOrders =
    data?.data?.filter(order => {
      if (status === "all") return true;
      if (status === "progress") return order.orderStatus === "Processing";
      if (status === "ready") return order.orderStatus === "Pending";
      if (status === "completed") return order.orderStatus === "Completed";
      return true;
    }) || [];

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-10 py-4 gap-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wide">Orders</h1>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          {["all", "progress", "ready", "completed"].map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-[#ababab] ${status === s ? "bg-[#383838] text-white" : ""} text-sm sm:text-lg rounded-lg px-4 py-2 font-medium transition`}
            >
              {s === "all" ? "All" : s === "progress" ? "In Progress" : s === "ready" ? "Ready" : "Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col overflow-y-auto px-4 sm:px-14 pb-32 sm:pb-20">
        {isLoading ? (
          <p className="text-white">Loading orders...</p>
        ) : filteredOrders.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {filteredOrders.map(order => (
              <OrderCard
                key={order._id}
                order={order}
                onUpdateStatus={() => completeOrder(order._id, order.table?._id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-white">No orders found.</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
