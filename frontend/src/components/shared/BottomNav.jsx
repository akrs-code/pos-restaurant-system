import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineReorder, MdTableBar } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomerTableModal from '../dashboard/Modal';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#252525] p-2 flex justify-around h-16">
      
      {/* Home */}
      <button
        onClick={() => navigate('/')}
        className={`${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} 
          w-[200px] flex items-center justify-center rounded-[20px]`}
      >
        <FaHome className="mr-2 size-[20px]" />
        Home
      </button>

      {/* Orders */}
      <button
        onClick={() => navigate('/orders')}
        className={`${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} 
          w-[200px] flex items-center justify-center rounded-[20px]`}
      >
        <MdOutlineReorder className="mr-2 size-[20px]" />
        Orders
      </button>

      {/* Tables */}
      <button
        onClick={() => navigate('/tables')}
        className={`${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} 
          w-[200px] flex items-center justify-center rounded-[20px]`}
      >
        <MdTableBar className="mr-2 size-[20px]" />
        Tables
      </button>

      {/* Create Order Button */}
      <button
      disabled={isActive("/menu")}
      onClick={() => setIsModalOpen(true)}
      className={`bg-[#f6B100] rounded-full text-[#1a1a1a] p-3 absolute -top-9
      ${isActive("/tables") || isActive("/menu") ? "hidden" : ""}`}
      >
        <BiSolidDish className="size-[30px]" />
      </button>



      {/* Customer Modal */}
      {isModalOpen && (
        <CustomerTableModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default BottomNav;
