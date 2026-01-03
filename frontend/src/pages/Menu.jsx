import React from 'react';
import BottomNav from '../components/shared/BottomNav';
import BackButton from '../components/shared/BackButton';
import { MdRestaurantMenu } from 'react-icons/md';
import MenuContainer from '../components/home/menu/MenuContainer';
import CustomerInfo from '../components/home/menu/CustomerInfo';
import CartInfo from '../components/home/menu/CartInfo';
import Bill from '../components/home/menu/Bill';
import { useSelector } from 'react-redux';

const Menu = () => {

    const customerData = useSelector(state => state.customer);

    return (
        <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col lg:flex-row gap-3'>

            {/* Left Section */}
            <div className='flex-1 overflow-y-auto'>
                <div className='flex items-center px-6 py-4 justify-between'>
                    <div className='flex items-center gap-4'>
                        <BackButton />
                        <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Menu</h1>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <MdRestaurantMenu className='text-[#f5f5f5] text-3xl' />
                        <div className='flex flex-col'>
                            <h1 className='text-md text-[#f5f5f5] font-semibold'>{customerData.customerName ||"Customer Name"}</h1>
                            <p className='text-xs text-[#ababab] font-medium'>{customerData.tableId || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <MenuContainer />
            </div>

            {/* Right Section */}
            <div className='w-full lg:w-[400px] bg-[#1a1a1a] rounded-lg flex flex-col overflow-y-auto max-h-[calc(100vh-5rem)]'>
                <CustomerInfo />
                <hr className='border-[#2a2a2a]' />
                <CartInfo />
                <hr className='border-[#2a2a2a]' />
                <Bill />
            </div>

            <BottomNav />
        </section>
    );
};

export default Menu;
