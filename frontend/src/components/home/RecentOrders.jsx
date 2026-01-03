import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import OrderList from './OrderList';
import { getOrders } from '../../https';

const RecentOrders = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                const data = res?.data?.data || [];
                setOrders(data);
                setFilteredOrders(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!search) {
                setFilteredOrders(orders);
                return;
            }

            const query = search.toLowerCase();

            const filtered = orders.filter(order =>
                order?.customerDetails?.name?.toLowerCase().includes(query) ||
                order?.orderStatus?.toLowerCase().includes(query) ||
                order?._id?.includes(query)
            );

            setFilteredOrders(filtered);
        }, 300); 

        return () => clearTimeout(timeout);
    }, [search, orders]);
    
    const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
     };

    return (
        <>
        <div className="bg-[#1f1f1f] flex flex-col sm:flex-row gap-4 mt-3 overflow-hidden">
            <div className="bg-[#1a1a1a] w-full rounded-xl shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-4">
                    <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold tracking-wide">
                        Recent Orders
                    </h1>
                    <button className="text-[#025cca] text-sm font-semibold hover:underline">
                        View all
                    </button>
                </div>

                {/* Search */}
                <div className="flex items-center gap-3 bg-[#1f1f1f] rounded-xl px-4 py-3 mx-4 sm:mx-6">
                    <FaSearch className="text-[#f5f5f5] text-sm" />
                    <input
                        type="text"
                        placeholder="Search by customer, status, or ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-[#f5f5f5] text-sm w-full"
                    />
                </div>

                {/* Content */}
                <div className="mt-4 px-4 sm:px-6 max-h-[300px] overflow-y-auto pb-6 space-y-3 scrollbar-hide">

                    {loading && (
                        <p className="text-[#ababab] text-sm">Loading orders...</p>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    {!loading && !error && filteredOrders.length === 0 && (
                        <p className="text-[#ababab] text-sm">No orders found</p>
                    )}

                    {!loading && !error && filteredOrders.map(order => (
                        <OrderList key={order._id} order={order} onClick={() => openModal(order)}/>
                    ))}
                </div>
            </div>
        </div>
             {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#262626] p-6 rounded-xl w-[90%] max-w-md relative text-white">
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <p><strong>Customer:</strong> {selectedOrder.customerDetails?.name}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            <p><strong>Total:</strong> ₱{selectedOrder.bills?.total || 0}</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Items</h3>
              <ul className="list-disc list-inside space-y-1 max-h-48 overflow-y-auto">
                {selectedOrder.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — ₱{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
             )}
          </>
        
    );
};

export default RecentOrders;
