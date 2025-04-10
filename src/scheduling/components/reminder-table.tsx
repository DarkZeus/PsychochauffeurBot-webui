import React from 'react';
import { Edit, Trash, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { Reminder } from '../scheduling.page';
import { parseUserMention } from '../utils/parseUserMention';

type ReminderTableProps = {
  reminders: Reminder[];
  isLoading: boolean;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: number) => void;
}

export const ReminderTable: React.FC<ReminderTableProps> = ({
  reminders,
  isLoading,
  onEdit,
  onDelete
}) => {
  const [reminderToDelete, setReminderToDelete] = React.useState<number | null>(null);

  // Function to format frequency display
  const formatFrequency = (frequency: string | null, dateModifier: string | null) => {
    if (dateModifier === 'first day of every month') return 'First day of every month';
    if (dateModifier === 'last day of every month') return 'Last day of every month';

    if (frequency === 'daily') return 'Daily';
    if (frequency === 'weekly') return 'Weekly';
    if (frequency === 'monthly') return 'Monthly';
    if (frequency?.startsWith('every')) return frequency.charAt(0).toUpperCase() + frequency.slice(1);

    return frequency || 'One-time';
  };

  // Handle confirm deletion
  const handleConfirmDelete = () => {
    if (reminderToDelete !== null) {
      onDelete(reminderToDelete);
      setReminderToDelete(null);
    }
  };

  // Handle cancel deletion
  const handleCancelDelete = () => {
    setReminderToDelete(null);
  };

  // Loading state
  if (isLoading && reminders.length === 0) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reminder</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Next Run</TableHead>
            <TableHead>For User</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reminders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No reminders found
              </TableCell>
            </TableRow>
          ) : (
            reminders.map((reminder) => {
              const { username } = parseUserMention(reminder.user_mention_md);

              return (
                <TableRow key={reminder.reminder_id}>
                  <TableCell>
                    <div className="font-medium">{reminder.task}</div>
                  </TableCell>
                  <TableCell>
                    {formatFrequency(reminder.frequency, reminder.date_modifier)}
                  </TableCell>
                  <TableCell>
                    {reminder.next_execution ? new Date(reminder.next_execution).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell>
                    {username ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {username}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-blue-600 border-blue-200"
                        onClick={() => onEdit(reminder)}
                        disabled={isLoading}
                        title="Edit reminder"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-600 border-red-200"
                        onClick={() => setReminderToDelete(reminder.reminder_id)}
                        disabled={isLoading}
                        title="Delete reminder"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <AlertDialog open={reminderToDelete !== null} onOpenChange={handleCancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Delete Reminder
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this reminder? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};