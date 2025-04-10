import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Settings,
  Terminal,
  BarChart,
  Menu,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  path: string;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, path, collapsed }: NavItemProps) => {
  return (
      <Link
          to={path}
          className={`flex items-center p-3 mb-1 rounded-md hover:bg-gray-800 transition-colors text-gray-400`}
          activeProps={{
            className: 'bg-gray-800 text-white',
            style: { fontWeight: 'bold' },
          }}
      >
        <Icon className="h-5 w-5"/>
        {!collapsed && <span className="ml-3 font-medium">{label}</span>}
      </Link>
  );
};

type NavRoute = {
  icon: LucideIcon;
  label: string;
  path: string;
}

const navRoutes: NavRoute[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Terminal, label: 'Commands', path: '/commands' },
  { icon: Calendar, label: 'Scheduling', path: '/scheduling' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: BarChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && <h1 className="text-xl font-bold">Psychochauffeur Dashboard</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-3">
          <nav className="space-y-1">
            {navRoutes.map((route) => (
              <NavItem
                key={route.path}
                icon={route.icon}
                label={route.label}
                path={route.path}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};