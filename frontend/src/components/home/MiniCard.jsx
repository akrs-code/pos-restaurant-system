import React from "react";

const MiniCard = ({ title, icon, number = 0, footerText }) => {
  // Ensure number is always a valid number
  const safeNumber = Number(number) || 0;

  return (
    <div className="bg-[#1a1a1a] py-5 px-4 rounded-lg flex-1 min-w-[150px] sm:min-w-[180px]">
      <div className="flex items-start justify-between">
        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
          {title}
        </h1>

        <div
          className={`${
            title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f68100]"
          } p-3 rounded-lg text-[#f5f5f5] text-2xl flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-[#f5f5f5] text-4xl sm:text-3xl font-bold">
          {title === "Total Earnings"
            ? safeNumber.toLocaleString("en-PH", {
                style: "currency",
                currency: "PHP",
              })
            : safeNumber}
        </h1>

        <p className="text-[#ababab] sm:text-sm mt-1">{footerText}</p>
      </div>
    </div>
  );
};

export default MiniCard;
