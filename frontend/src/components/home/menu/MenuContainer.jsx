import React, { useState, useEffect } from 'react';
import { menus } from '../../../constants';
import { GrRadialSelected } from 'react-icons/gr';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addItems } from '../../../redux/slices/cartSlice';

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({}); // track all item counters
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectMenu = (menu) => {
    setSelected(menu);
    if (isMobile) setShowModal(true);
  };

  const increment = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 6),
    }));
  };

  const decrement = (id) => {
    setItemCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const count = itemCounts[item.id] || 0;
    if (count === 0) return;

    dispatch(addItems({ name: item.name, price: item.price, quantity: count }));

    // reset only this item's counter
    setItemCounts((prev) => ({ ...prev, [item.id]: 0 }));

    if (isMobile) setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* CATEGORY MENU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-10 py-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:scale-105"
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => handleSelectMenu(menu)}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-white text-base sm:text-lg font-semibold flex items-center gap-2">
                {menu.icon} {menu.name}
              </h1>
              {selected.id === menu.id && (
                <GrRadialSelected className="text-white text-xl" />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-medium mt-2">
              {menu.items.length} Items
            </p>
          </div>
        ))}
      </div>

      {/* ITEM LIST for Desktop */}
      {!isMobile && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-10 py-4">
          {selected?.items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              count={itemCounts[item.id] || 0}
              increment={() => increment(item.id)}
              decrement={() => decrement(item.id)}
              handleAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}

      {/* MOBILE MODAL */}
      {isMobile && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1a1a1a] w-full max-w-md rounded-xl p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-white text-lg font-semibold mb-4">{selected.name}</h2>

            <div className="grid grid-cols-1 gap-4">
              {selected.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  count={itemCounts[item.id] || 0}
                  increment={() => increment(item.id)}
                  decrement={() => decrement(item.id)}
                  handleAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Item card component
const ItemCard = ({ item, count, increment, decrement, handleAddToCart }) => (
  <div className="flex flex-col justify-between p-4 rounded-xl min-h-[140px] cursor-pointer hover:bg-[#2a2a2a] text-white transition shadow-sm">
    <div className="flex items-start justify-between w-full">
      <h1 className="text-white text-base sm:text-lg font-semibold">{item.name}</h1>
      <button
        onClick={handleAddToCart}
        className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg hover:bg-[#3a5c4b] transition"
      >
        <FaShoppingCart size={20} />
      </button>
    </div>

    <div className="flex items-center justify-between w-full mt-4">
      <p className="text-[#ababab] text-base sm:text-lg font-bold">
        ₱{item.price.toLocaleString()}
      </p>
      <div className="flex items-center justify-between bg-[#1f1f1f] px-3 py-2 gap-3 rounded-lg">
        <button onClick={decrement} className="text-yellow-500 text-xl sm:text-2xl px-2">&minus;</button>
        <span className="text-white font-medium min-w-[20px] text-center">{count}</span>
        <button onClick={increment} className="text-yellow-500 text-xl sm:text-2xl px-2">&#43;</button>
      </div>
    </div>
  </div>
);

export default MenuContainer;
