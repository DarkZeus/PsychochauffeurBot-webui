// Define the API response types
export type ReminderResponse = {
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

export type RemindersListResponse = {
  items: ReminderResponse[];
  count: number;
}

// Define the UI model
export type ReminderTask = {
  id: number;
  name: string;
  description: string;
  schedule: string;
  lastRun: string | null;
  nextRun: string | null;
  status: 'active' | 'paused' | 'completed' | 'failed';
  type: 'message' | 'report' | 'notification' | 'maintenance' | 'sync';
  targetCount: number | null;
  created: string;
  userId: number;
  chatId: number;
  userMention: string | null;
}

export type BreadcrumbItem = {
  title: string;
  isCurrentPage: boolean;
}