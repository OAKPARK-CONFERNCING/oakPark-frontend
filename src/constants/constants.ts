function formatDate(dateStr:string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default formatDate;


/**
 * Formats ISO date string into separated date and time components
 * @param isoString - ISO 8601 date string (e.g., "2023-11-07T14:30:00Z")
 * @returns Object with formatted date and time strings
 */
export const formatMeetingDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);
  
  return {
    formattedDate: dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    formattedTime: dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    isoString: isoString  // original ISO format if needed
  };
};

/**
 * Formats file lastViewed date for display
 * @param isoString - ISO 8601 date string
 * @returns Object with formatted date, time, and relative time
 */
export const formatFileLastViewed = (isoString: string) => {
  const dateObj = new Date(isoString);
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
  
  let relativeTime = '';
  if (diffHours < 24) {
    relativeTime = 'Today';
  } else if (diffHours < 48) {
    relativeTime = 'Yesterday';
  } else {
    relativeTime = `${Math.floor(diffHours/24)} days ago`;
  }

  return {
    formattedDate: dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    formattedTime: dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    relativeTime
  };
};