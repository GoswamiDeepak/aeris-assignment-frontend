import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { SidebarNavigation } from '@/components/dashboard/SideBarNavigation';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Root = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SidebarNavigation collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <main className={`flex-1 p-5 overflow-y-auto transition-all ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <DashboardHeader />
                <Outlet />
            </main>
        </div>
    );
};

export default Root;
