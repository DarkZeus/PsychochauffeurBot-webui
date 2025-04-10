import { Badge } from '@/components/ui/badge';

type StatusType = 'active' | 'paused' | 'completed' | 'failed';

type StatusBadgeProps = {
  status: StatusType;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
};