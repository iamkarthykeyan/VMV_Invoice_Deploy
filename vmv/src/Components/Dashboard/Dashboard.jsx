import React, { useState } from 'react';
import { FiHome, FiDroplet, FiBox } from 'react-icons/fi';
import { MdHistory } from "react-icons/md";
import HomeElement from './DashboardElements/HomeElement';
import ThemesElement from './DashboardElements/ThemesElement';
import Histories from './DashboardElements/Histories';

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('home');

    const renderContent = () => {
        switch (activeMenu) {
            case 'home':
                return <Home />;
            case 'invoicethemes':
                return <InvoiceThemes />;
            case 'historyinvoice':
                return <HistoryInvoice />;
            case 'items':
                return <Items />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-6 text-gray-900">Tools</h1>
                    <ul className="space-y-2">
                        <MenuItem icon={FiHome} label="Home" active={activeMenu === 'home'} onClick={() => setActiveMenu('home')} />
                        <MenuItem icon={FiDroplet} label="InvoiceThemes" active={activeMenu === 'invoicethemes'} onClick={() => setActiveMenu('invoicethemes')} />
                        <MenuItem icon={MdHistory} label="History" active={activeMenu === 'historyinvoice'} onClick={() => setActiveMenu('historyinvoice')} />
                        <MenuItem icon={FiBox} label="Items" active={activeMenu === 'items'} onClick={() => setActiveMenu('items')} />
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-gray-50">
                {renderContent()}
            </main>
        </div>
    );
};

const MenuItem = ({ icon: Icon, label, active, onClick }) => {
    return (
        <li
            className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all 
      ${active ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
            onClick={onClick}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </li>
    );
};

const Home = () => <HomeElement />;
const InvoiceThemes = () => <ThemesElement />;
const HistoryInvoice = () => <Histories />;
const Items = () => <h2 className="text-3xl font-semibold">Items</h2>;

export default Dashboard;
