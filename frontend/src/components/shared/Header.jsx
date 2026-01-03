import React, { useState } from 'react'
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import logo from '../../assets/images/logo.png';
import { removeUser } from '../../redux/slices/userSlice';
import { setSearchQuery } from '../../redux/slices/searchSlice'; // 👈 new
import { logout } from '../../https';

const Header = () => {
    const [search, setSearch] = useState("");
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            dispatch(removeUser());
            navigate("/auth");
        }
    });

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        dispatch(setSearchQuery(value));
    };

    return (
        <header className='flex justify-between items-center py-4 px-8 gap-3 bg-[#1a1a1a]'>

            {/* LOGO */}
            <div onClick={() => navigate("/")} className='flex items-center gap-2 cursor-pointer'>
                <img src={logo} alt="logo" className='h-8 w-8' />
                <h1 className='text-lg font-semibold text-[#f5f5f5] md:hidden'>Restro</h1>
            </div>

            {/* SEARCH BAR */}
            <div className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]'>
                <FaSearch className="text-[#f5f5f5]" />
                <input
                    type="text"
                    placeholder="Search orders, tables, items..."
                    value={search}
                    onChange={handleSearch}
                    className="bg-transparent outline-none text-[#f5f5f5] w-full"
                />
            </div>

            {/* USER INFO */}
            <div className='flex items-center gap-4'>
                {userData.role === "admin" && (
                    <div onClick={() => navigate("/dashboard")} className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
                        <MdDashboard className='text-[#f5f5f5] text-2xl' />
                    </div>
                )}


                <div className='flex items-center gap-3'>
                    <FaUserCircle className='text-[#f5f5f5] text-2xl' />
                    <div>
                        <h1 className='text-md text-[#f5f5f5]'>
                        {userData.name?.split(" ")[0] || "User"}
                        </h1>

                        <p className='text-xs text-[#ababab]'>{userData.role}</p>
                    </div>
                    <IoLogOut
                        onClick={() => logoutMutation.mutate()}
                        className='text-[#f5f5f5] cursor-pointer'
                        size={28}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
