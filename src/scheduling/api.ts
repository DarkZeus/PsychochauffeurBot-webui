import axios from 'axios';
import type { Reminder } from './scheduling.page';

// API URL from environment or fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API functions for TanStack Query
export const reminderApi = {
  getReminders: async (): Promise<Reminder[]> => {
    const response = await axios.get<{ items: Reminder[], count: number }>(`${API_URL}/reminders/`);
    return response.data.items;
  },

  getReminderById: async (id: number): Promise<Reminder> => {
    const response = await axios.get<Reminder>(`${API_URL}/reminders/${id}`);
    return response.data;
  },

  createReminder: async (reminder: Reminder): Promise<Reminder> => {
    // For new reminders, set default values if not provided
    const reminderData = {
      ...reminder,
      user_id: reminder.user_id || 123456789, // Default user ID
      chat_id: reminder.chat_id || -100123456789, // Default chat ID
    };

    // Don't send reminder_id in create request
    const { reminder_id, ...createData } = reminderData;
    const response = await axios.post<Reminder>(`${API_URL}/reminders/`, createData);
    return response.data;
  },

  updateReminder: async (reminder: Reminder): Promise<Reminder> => {
    const response = await axios.put<Reminder>(`${API_URL}/reminders/${reminder.reminder_id}`, reminder);
    return response.data;
  },

  deleteReminder: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/reminders/${id}`);
  }
};