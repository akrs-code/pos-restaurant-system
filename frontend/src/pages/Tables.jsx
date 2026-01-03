import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTables, addMultipleTables } from "../https";
import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const queryClient = useQueryClient();
  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
    keepPreviousData: true,
  });

  const [status, setStatus] = useState("all");
  const [numTables, setNumTables] = useState("");

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const handleAddTables = async () => {
    const n = parseInt(numTables);
    if (!n || n <= 0) {
      enqueueSnackbar("Please enter a valid number", { variant: "warning" });
      return;
    }

    try {
      await addMultipleTables(n);
      enqueueSnackbar(`${n} table(s) added successfully`, { variant: "success" });
      setNumTables("");
      queryClient.invalidateQueries(["tables"]);
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Failed to add tables", { variant: "error" });
    }
  };

  return (
    <section className="bg-[#1f1f1f] min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-10 py-4 gap-4">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wide">
            Tables
          </h1>
        </div>

        <div className="flex gap-2 sm:gap-4 flex-wrap items-center">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] ${status === "all" && "bg-[#383838] text-white"} text-sm sm:text-lg rounded-lg px-4 py-2 font-medium transition`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] ${status === "booked" && "bg-[#383838] text-white"} text-sm sm:text-lg rounded-lg px-4 py-2 font-medium transition`}
          >
            Booked
          </button>

          {/* Add Multiple Tables */}
          <input
            type="number"
            placeholder="Number of tables"
            value={numTables}
            onChange={(e) => setNumTables(e.target.value)}
            className="w-32 px-4 py-3 rounded-lg bg-[#262626] text-white focus:outline-none text-sm"
          />
          <button
            onClick={handleAddTables}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm sm:text-lg font-medium hover:bg-yellow-500 transition"
          >
            Add Tables
          </button>
        </div>
      </div>

      {/* Table Grid */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-32 sm:pb-20">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
          {(resData?.data?.data || [])
            .filter((t) => status === "all" || t.status === "Occupied")
            .map((table) => (
              <TableCard
                key={table._id}
                id={table._id}
                name={table.tableNo}
                status={table.status}
                initials={table?.currentOrder?.customerDetails?.name}
              />
            ))}
        </div>
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
