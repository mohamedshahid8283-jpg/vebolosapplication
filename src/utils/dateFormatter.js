export const formatTime = date => {
  const d = new Date(date);

  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = date => {
  const d = new Date(date);

  return d.toLocaleDateString();
};

export const formatMessageDate = date => {
  const d = new Date(date);
  const today = new Date();

  const isToday = d.toDateString() === today.toDateString();

  if (isToday) {
    return formatTime(date);
  }

  return d.toLocaleDateString();
};

export const formatCallDuration = seconds => {
  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
