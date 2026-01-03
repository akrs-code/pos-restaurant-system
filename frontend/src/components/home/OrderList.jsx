import React from 'react';

const OrderList = ({ order, onClick }) => (
    <div onClick={onClick} className="bg-[#2a2a2a] p-3 rounded-lg flex justify-between items-center">
        <div>
            <p className="text-[#f5f5f5] font-semibold">{order.customerDetails.name}</p>
            <p className="text-[#ababab] text-sm">{order.orderStatus}</p>
        </div>
        <p className="text-[#f5f5f5] font-bold">₱{order.bills.totalWithTax}</p>
    </div>
);



export default OrderList