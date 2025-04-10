// Define valid day keys
type DayKey = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// Type guard function to check if a string is a valid day key
const isDayKey = (key: string): key is DayKey => {
  return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].includes(key);
};

// Format cron expression in a human-readable way
export const formatCron = (cronExpression: string): string => {
  const parts = cronExpression.split(' ');
  const dayMap: Record<DayKey, string> = {
    'MON': 'Monday',
    'TUE': 'Tuesday',
    'WED': 'Wednesday',
    'THU': 'Thursday',
    'FRI': 'Friday',
    'SAT': 'Saturday',
    'SUN': 'Sunday'
  };

  // Check if we have enough parts and if parts[4] is a valid day key
  if (parts.length >= 5 && isDayKey(parts[4]) && parts[2] === '*' && parts[3] === '*') {
    return `Every ${dayMap[parts[4]]} at ${parts[1]}:${parts[0] === '0' ? '00' : parts[0]}`;
  } else if (parts.length >= 5 && parts[2] === '*' && parts[3] === '*' && parts[4] === '*') {
    if (parts[1].startsWith('*/')) {
      const hours = parts[1].split('/')[1];
      return `Every ${hours} hours`;
    }
    return `Daily at ${parts[1]}:${parts[0] === '0' ? '00' : parts[0]}`;
  } else if (parts.length >= 5 && parts[3] === '*' && parts[4] === '*') {
    return `Every month on day ${parts[2]} at ${parts[1]}:${parts[0] === '0' ? '00' : parts[0]}`;
  }

  return cronExpression;
};

// Get frequency value from cron expression
export const getCronFrequency = (schedule: string): 'daily' | 'weekly' | 'monthly' | 'custom' => {
  if (schedule === '0 9 * * *') return 'daily';
  if (schedule === '0 9 * * MON') return 'weekly';
  if (schedule === '0 9 1 * *') return 'monthly';
  return 'custom';
};

// Convert frequency to cron expression
export const getScheduleFromFrequency = (frequency: string): string => {
  switch (frequency) {
    case 'daily': return '0 9 * * *';
    case 'weekly': return '0 9 * * MON';
    case 'monthly': return '0 9 1 * *';
    default: return '0 9 * * *';
  }
};