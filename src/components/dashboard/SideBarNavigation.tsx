import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, ChartBar } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigationItems = [
    { icon: ChartBar, label: 'Dashboard', active: true, href: '/' },
    { icon: Calendar, label: 'List', active: false, href: '/list' },
    // { icon: Filter, label: 'Filters', active: false },
    // { icon: Search, label: 'Search', active: false },
    // { icon: Settings, label: 'Settings', active: false, href: '/settings' },
];

interface SidebarNavigationProps {
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
}

export const SidebarNavigation = ({ collapsed = false, setCollapsed = () => {} }: SidebarNavigationProps) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);

    // Use props if provided, otherwise use internal state
    const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
    const toggleCollapsed = () => {
        if (setCollapsed) {
            setCollapsed(!isCollapsed);
        } else {
            setInternalCollapsed(!isCollapsed);
        }
    };

    return (
        <div
            className={cn(
                'bg-sidebar text-sidebar-foreground h-screen transition-all fixed left-0 top-0 z-40',
                isCollapsed ? 'w-20' : 'w-64'
            )}>
            <div className="flex flex-col h-full">
                <div className="p-5 flex items-center justify-between">
                    {!isCollapsed && <h1 className="text-xl font-bold">Vehical Monitor</h1>}
                    <Button variant="ghost" size="icon" onClick={toggleCollapsed} className="text-sidebar-foreground">
                        {isCollapsed ? '→' : '←'}
                    </Button>
                </div>

                <nav className="mt-8 flex-1">
                    <ul>
                        {navigationItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={item.href}
                                    // variant="ghost"
                                    className={({ isActive }) => {
                                        return cn(
                                            'w-full flex justify-start rounded-none h-14 px-5 text-sidebar-foreground hover:bg-sidebar-accent',
                                            isActive && 'bg-sidebar-accent'
                                        );
                                    }}>
                                    <item.icon className="mr-3" size={20} />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-5">
                    <div className="rounded bg-sidebar-accent p-4">
                        <p className={cn('text-sm', isCollapsed && 'hidden')}>Deepak Goswami</p>
                        <p className={cn('text-sm', isCollapsed && 'hidden')}>PH: +91-9149284057</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
