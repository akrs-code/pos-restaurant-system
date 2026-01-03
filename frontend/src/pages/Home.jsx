import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrCheckmark } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { enqueueSnackbar } from "notistack";

const Home = () => {
  // Fetch all orders
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await getOrders();
      return res.data;
    },
    onError: () =>
      enqueueSnackbar("Failed to load orders", { variant: "error" }),
  });

  const orders = data?.data || [];

  const totalEarnings = orders.reduce(
    (sum, order) => sum + Number(order.bills?.totalWithTax || 0),
    0
  );

  const inProgressOrders = orders.filter(
    (order) =>
      order.orderStatus?.toLowerCase() === "processing" ||
      order.orderStatus?.toLowerCase() === "pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "completed"
  ).length;

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col sm:flex-row gap-4 overflow-hidden">
      {/* Left Section */}
      <div className="flex-[3] overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
        <Greetings />

        {/* Metrics Cards */}
        <div className="flex gap-4 mt-6">
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={totalEarnings}
            footerText={`₱${totalEarnings.toLocaleString()} total (with tax)`}
          />

          <MiniCard
            title="Completed"
            icon={<GrCheckmark />}
            number={completedOrders}
            footerText={`${completedOrders} orders`}
          />
        </div>

        {/* Recent Orders */}
        <RecentOrders orders={orders} loading={isLoading} />
      </div>

      {/* Right Section */}
      <div className="flex-[2] px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-5rem)]">
       <PopularDishes orders={orders} />
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;
