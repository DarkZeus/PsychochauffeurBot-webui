import { useState } from 'react';
import {
  Plus,
  Search,
  CalendarDays,
  RefreshCw,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SidebarBreadcrumb } from "@/components/sidebar/sidebar-breadcrumb.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useSearch,
  useRouter,
} from '@tanstack/react-router';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import type { BreadcrumbItem } from './types';
import { ReminderDialog } from './components/reminder-dialog.tsx';
import { reminderApi } from './api';
import {parseUserMention} from "@/scheduling/utils/parseUserMention.ts";
import {ReminderTable} from "@/scheduling/components/reminder-table.tsx";

// Define the reminder type to match the API model
export type Reminder = {
  reminder_id: number;
  task: string;
  frequency: string | null;
  delay: string | null;
  date_modifier: string | null;
  next_execution: string | null;
  user_id: number;
  chat_id: number;
  user_mention_md: string | null;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { title: "Reminders", isCurrentPage: true }
];

export const SchedulingPage = () => {
  const queryClient = useQueryClient();
  const search = useSearch({ from: '/scheduling' });
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // Convert search date to Date object
  const selectedDate = search.date instanceof Date ? search.date : new Date(search.date);

  // Update search params in URL
  const updateSearch = (updates: Partial<typeof search>) => {
    router.navigate({
      to: '/scheduling',
      search: {
        ...search,
        ...updates
      },
      replace: true
    });
  };

  // Fetch reminders with TanStack Query
  const {
    data: reminders = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['reminders'],
    queryFn: reminderApi.getReminders
  });

  // Mutations for create, update, delete
  const createMutation = useMutation({
    mutationFn: reminderApi.createReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      setDialogOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: reminderApi.updateReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      setDialogOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: reminderApi.deleteReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  const handleCreateReminder = () => {
    // Create a default reminder task
    const newReminder: Reminder = {
      reminder_id: 0, // Will be assigned by API
      task: '',
      frequency: 'daily',
      delay: null,
      date_modifier: null,
      next_execution: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      user_id: 0, // Will be set on save
      chat_id: 0, // Will be set on save
      user_mention_md: null
    };
    setEditingReminder(newReminder);
    setDialogOpen(true);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder({...reminder});
    setDialogOpen(true);
  };

  const handleSaveReminder = () => {
    if (!editingReminder) return;

    if (editingReminder.reminder_id === 0) {
      // Create new reminder
      createMutation.mutate(editingReminder);
    } else {
      // Update existing reminder
      updateMutation.mutate(editingReminder);
    }
  };

  const handleDeleteReminder = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Filter reminders by search query
  const filteredReminders = reminders.filter(reminder =>
    reminder.task.toLowerCase().includes(search.search?.toLowerCase() || '')
  );

  // Combined loading and error states
  const isAnyLoading = isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
  const errorMessage = error ? 'Failed to load reminders' :
                      createMutation.error ? 'Failed to create reminder' :
                      updateMutation.error ? 'Failed to update reminder' :
                      deleteMutation.error ? 'Failed to delete reminder' : null;

  // Helper to format frequency for display
  const formatFrequency = (frequency: string | null, dateModifier: string | null) => {
    if (dateModifier === 'first day of every month') return 'First day of every month';
    if (dateModifier === 'last day of every month') return 'Last day of every month';

    if (frequency === 'daily') return 'Daily';
    if (frequency === 'weekly') return 'Weekly';
    if (frequency === 'monthly') return 'Monthly';
    if (frequency?.startsWith('every')) return frequency.charAt(0).toUpperCase() + frequency.slice(1);

    return frequency || 'One-time';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <SidebarBreadcrumb items={breadcrumbItems}/>
          </div>
        </header>
        <Button onClick={handleCreateReminder} disabled={isAnyLoading}>
          <Plus className="mr-2 h-4 w-4"/>
          New Reminder
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"/>
          <Input
            className="pl-9"
            placeholder="Search reminders..."
            value={search.search}
            onChange={(e) => updateSearch({ search: e.target.value })}
          />
        </div>
        <Button variant="outline" onClick={() => refetch()} disabled={isAnyLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isAnyLoading ? 'animate-spin' : ''}`}/>
          Refresh
        </Button>
      </div>

      <Tabs value={search.view} onValueChange={(value) => updateSearch({ view: value })}>
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reminders</CardTitle>
              <CardDescription>
                Manage your bot's reminders and scheduled messages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && reminders.length === 0 ? (
                <div className="text-center p-8">Loading reminders...</div>
              ) : (
                <ReminderTable
                  reminders={filteredReminders}
                  isLoading={isAnyLoading}
                  onEdit={handleEditReminder}
                  onDelete={handleDeleteReminder}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                View your scheduled reminders in a calendar layout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => updateSearch({ date: date || new Date() })}
                    className="border rounded-md p-3"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-3">Reminders on {selectedDate.toLocaleDateString()}</h3>
                  <ScrollArea className="h-[300px]">
                    {filteredReminders
                        .filter(reminder => {
                          if (!reminder.next_execution) return false;
                          const reminderDate = new Date(reminder.next_execution);
                          return reminderDate.toDateString() === selectedDate.toDateString();
                        })
                        .map(reminder => {
                          const {username} = parseUserMention(reminder.user_mention_md);

                          return (
                              <Card key={reminder.reminder_id} className="mb-3 last:mb-0">
                                <CardHeader className="py-3 px-4">
                                  <CardTitle className="text-base">{reminder.task}</CardTitle>
                                </CardHeader>
                                <CardContent className="py-2 px-4">
                                  <div className="flex items-center text-sm space-x-2">
                                    <Clock className="h-4 w-4 text-gray-500"/>
                                    <span>{reminder.next_execution ? new Date(reminder.next_execution).toLocaleTimeString() : '-'}</span>
                                    <span className="text-gray-500">
              {formatFrequency(reminder.frequency, reminder.date_modifier)}
            </span>
                                  </div>
                                  {username && (
                                      <div className="flex items-center mt-2">
                                        <span className="text-sm text-gray-600 mr-2">For:</span>
                                        <span
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {username}
              </span>
                                      </div>
                                  )}
                                </CardContent>
                              </Card>
                          );
                        })}
                    {filteredReminders.filter(reminder => {
                      if (!reminder.next_execution) return false;
                      const reminderDate = new Date(reminder.next_execution);
                      return reminderDate.toDateString() === selectedDate.toDateString();
                    }).length === 0 && (
                      <div className="text-center p-6 text-gray-500">
                        <CalendarDays className="h-8 w-8 mx-auto mb-2"/>
                        <p>No reminders for this date.</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReminderDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        reminder={editingReminder}
        onReminderChange={setEditingReminder}
        onSave={handleSaveReminder}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};