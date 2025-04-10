import { Badge } from '@/components/ui/badge';
import { MessageSquare, Bell, BarChart, RefreshCw } from 'lucide-react';

type TaskType = 'message' | 'report' | 'notification' | 'maintenance' | 'sync';

type TypeBadgeProps = {
  type: TaskType;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const typeConfig = {
    message: { icon: <MessageSquare className="mr-1 h-3 w-3" />, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    report: { icon: <BarChart className="mr-1 h-3 w-3" />, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    notification: { icon: <Bell className="mr-1 h-3 w-3" />, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' },
    maintenance: { icon: <RefreshCw className="mr-1 h-3 w-3" />, color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
    sync: { icon: <RefreshCw className="mr-1 h-3 w-3" />, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' }
  };

  const config = typeConfig[type] || { icon: null, color: 'bg-gray-100 text-gray-800' };

  return (
    <Badge variant="outline" className={`flex items-center ${config.color}`}>
      {config.icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};