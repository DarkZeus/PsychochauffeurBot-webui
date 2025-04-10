/**
 * Parses a Telegram markdown-formatted user mention
 * Format: [Username](tg://user?id=123456789)
 */
export const parseUserMention = (mentionMd: string | null): { username: string; userId: string | null } => {
  if (!mentionMd) {
    return { username: '', userId: null };
  }

  try {
    // Extract username from [Username](link)
    const usernameMatch = mentionMd.match(/\[(.*?)]/);
    const username = usernameMatch ? usernameMatch[1] : '';

    // Extract user ID from tg://user?id=123456789
    const userIdMatch = mentionMd.match(/tg:\/\/user\?id=(\d+)/);
    const userId = userIdMatch ? userIdMatch[1] : null;

    return { username, userId };
  } catch (error) {
    console.error('Error parsing user mention:', error);
    return { username: mentionMd, userId: null };
  }
};