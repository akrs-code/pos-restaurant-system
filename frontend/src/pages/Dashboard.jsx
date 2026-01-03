import React, { useState } from 'react';
import { BiSolidDish } from 'react-icons/bi';
import { MdCategory, MdTableBar } from 'react-icons/md';
import Metrics from '../components/dashboard/Metrics';
import RecentOrders from '../components/dashboard/RecentOrders';
import Modal from '../components/dashboard/Modal';

const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];

const Dashboard = () => {
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Metrics");
    const handleOpenModal = (action) => {
        if (action === "table") setIsTableModalOpen(true)
    }

    return (
        <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
            <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
                <div className="flex items-center gap-3">
                    {buttons.map(({ label, icon, action }) => (
                        <button
                            onClick={() => handleOpenModal(action)}
                            key={action}
                            className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg font-semibold text-md flex items-center gap-2 text-[#f5f5f5]"
                        >
                            {label}
                            {icon}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-8 py-3 rounded-lg font-semibold text-md flex items-center gap-2 text-[#f5f5f5] ${activeTab === tab
                                ? "bg-[#262626]"
                                : "bg-[#1a1a1a] hover:bg-[#262626]"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <RecentOrders />}
            {activeTab === "Payment" && (
                <div className="container mx-auto text-[#f5f5f5] px-6 md:px-4">
                    <h2 className="text-xl font-semibold">Payment Section Coming Soon</h2>
                </div>
            )}

            {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
        </div>
    );
};

export default Dashboard;
