import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Reminder } from '../scheduling.page';
import {parseUserMention} from "@/scheduling/utils/parseUserMention.ts";

type ReminderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: Reminder | null;
  onReminderChange: (reminder: Reminder) => void;
  onSave: () => void;
  isLoading: boolean;
}

export const ReminderDialog: React.FC<ReminderDialogProps> = ({
  open,
  onOpenChange,
  reminder,
  onReminderChange,
  onSave,
  isLoading
}) => {
  if (!reminder) return null;

  const handleChange = (field: keyof Reminder, value: any) => {
    onReminderChange({ ...reminder, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {reminder.reminder_id ? `Edit Reminder` : 'Create New Reminder'}
          </DialogTitle>
          <DialogDescription>
            Configure your reminder details and timing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="task">Reminder Text</Label>
            <Textarea
              id="task"
              value={reminder.task}
              onChange={(e) => handleChange('task', e.target.value)}
              placeholder="What would you like to be reminded about?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={reminder.frequency || ''}
                onValueChange={(value) => handleChange('frequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date_modifier">Date Modifier</Label>
              <Select
                value={reminder.date_modifier || ''}
                onValueChange={(value) => handleChange('date_modifier', value !== 'none' ? value : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select modifier"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="first day of every month">First day of month</SelectItem>
                  <SelectItem value="last day of every month">Last day of month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="delay">Delay (optional)</Label>
            <Input
              id="delay"
              value={reminder.delay || ''}
              onChange={(e) => handleChange('delay', e.target.value || null)}
              placeholder="e.g. 'in 5 minutes', 'in 2 hours'"
            />
            <p className="text-sm text-gray-500">
              Leave empty to schedule based on frequency
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="user_mention">User (optional)</Label>
            <Input
                id="user_mention"
                value={parseUserMention(reminder.user_mention_md).username}
                onChange={(e) => {
                  const username = e.target.value.trim();
                  // Only update if there's a value
                  if (username) {
                    const userMention = `[${username}](tg://user?id=0)`;
                    handleChange('user_mention_md', userMention);
                  } else {
                    handleChange('user_mention_md', null);
                  }
                }}
                placeholder="Who is this reminder for?"
            />
            <p className="text-sm text-gray-500">
              Enter a username to associate with this reminder
            </p>
          </div>

          {reminder.frequency !== 'daily' && reminder.frequency !== 'weekly' && reminder.frequency !== 'monthly' && (
            <div className="grid gap-2">
              <Label htmlFor="next_execution">Next Execution Date</Label>
              <Input
                id="next_execution"
                type="datetime-local"
                value={reminder.next_execution ? new Date(reminder.next_execution).toISOString().slice(0, 16) : ''}
                onChange={(e) => handleChange('next_execution', e.target.value ? new Date(e.target.value).toISOString() : null)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isLoading || !reminder.task.trim()}>
            {isLoading ? 'Saving...' : 'Save Reminder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};