import React, { useMemo } from 'react';

const PopularDishes = ({ orders = [] }) => {

  const popularDishes = useMemo(() => {
    const dishMap = {};

    orders.forEach(order => {
      order.items?.forEach(item => {
        if (dishMap[item.name]) {
          dishMap[item.name].quantity += item.quantity;
        } else {
          dishMap[item.name] = {
            name: item.name,
            image: item.image || '', 
            quantity: item.quantity,
          };
        }
      });
    });

    
    return Object.values(dishMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [orders]);

  return (
    <div className="mt-6 pr-4 sm:pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4">
          <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
        </div>

        {/* Dish list */}
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-hide px-2 sm:px-4 pb-6 space-y-4">
          {popularDishes.length > 0 ? (
            popularDishes.map((dish, index) => (
              <div
                key={dish.name}
                className="flex items-center gap-4 bg-[#1f1f1f] rounded-xl px-4 py-3"
              >
                <h1 className="text-[#f5f5f5] font-bold text-lg sm:text-xl w-8">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </h1>
                <div className="flex flex-col">
                  <h1 className="text-[#f5f5f5] font-semibold text-sm sm:text-base truncate">
                    {dish.name}
                  </h1>
                  <p className="text-[#ababab] text-xs sm:text-sm">
                    Orders: <span className="text-[#f5f5f5] font-medium">{dish.quantity}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#ababab] text-sm px-4 py-2">No popular dishes yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
