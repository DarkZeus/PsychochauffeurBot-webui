import type { ReminderResponse, ReminderTask } from '../types.ts';

// Helper to determine the task type based on the content
export const determineTaskType = (task: string): 'message' | 'report' | 'notification' | 'maintenance' | 'sync' => {
  if (task.includes('report') || task.includes('analytics')) {
    return 'report';
  } else if (task.includes('notify') || task.includes('alert') || task.includes('reminder')) {
    return 'notification';
  } else if (task.includes('clean') || task.includes('update') || task.includes('maintenance')) {
    return 'maintenance';
  } else if (task.includes('sync') || task.includes('download') || task.includes('fetch')) {
    return 'sync';
  }
  return 'message'; // Default type
};

// Convert API response to UI model
export const mapReminderToTask = (reminder: ReminderResponse): ReminderTask => {
  // Extract the core text from the task (assume everything before any special characters is the name)
  const taskParts = reminder.task.split(/\s*[:(]/);
  const name = taskParts[0].trim() || 'Unnamed Reminder';
  const description = taskParts.length > 1 ? reminder.task.substring(name.length).trim() : reminder.task;

  // Determine status based on available data
  let status: 'active' | 'paused' | 'completed' | 'failed' = 'active';
  if (!reminder.next_execution) {
    status = 'completed';
  }

  // Determine the schedule representation based on frequency and date_modifier
  let schedule = '0 9 * * *'; // Default daily at 9am
  if (reminder.frequency === 'daily') {
    schedule = '0 9 * * *';
  } else if (reminder.frequency === 'weekly') {
    schedule = '0 9 * * MON';
  } else if (reminder.frequency === 'monthly') {
    schedule = '0 9 1 * *';
  } else if (reminder.frequency?.startsWith('every')) {
    schedule = '0 9 * * *';
  }

  return {
    id: reminder.reminder_id,
    name,
    description,
    schedule,
    lastRun: null, // API doesn't provide last run info
    nextRun: reminder.next_execution,
    status,
    type: determineTaskType(reminder.task.toLowerCase()),
    targetCount: null, // API doesn't provide target count
    created: new Date().toISOString(), // API doesn't provide creation date
    userId: reminder.user_id,
    chatId: reminder.chat_id,
    userMention: reminder.user_mention_md
  };
};

// Map UI model back to API model for saving
export const mapTaskToReminder = (task: ReminderTask): Partial<ReminderResponse> => {
  // Combine name and description as the task text
  const taskText = task.description ? `${task.name}: ${task.description}` : task.name;

  // Determine frequency from schedule
  let frequency = null;
  if (task.schedule.includes('* * *')) {
    frequency = 'daily';
  } else if (task.schedule.includes('* * MON')) {
    frequency = 'weekly';
  } else if (task.schedule.includes('1 * *')) {
    frequency = 'monthly';
  }

  return {
    reminder_id: task.id,
    task: taskText,
    frequency,
    delay: null,
    date_modifier: null,
    next_execution: task.nextRun,
    user_id: task.userId,
    chat_id: task.chatId,
    user_mention_md: task.userMention
  };
};