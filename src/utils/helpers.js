// Function to group tickets by a given property (status, user, or priority)
export const groupTicketsBy = (tickets, key) => {
  return tickets.reduce((acc, ticket) => {
    const groupKey = ticket[key] || 'Unassigned';
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(ticket);
    return acc;
  }, {});
};

// Function to sort tickets by priority or title
export const sortTickets = (tickets, sortBy) => {
  return [...tickets].sort((a, b) => {
    if (sortBy === 'Priority') return b.priority - a.priority;
    if (sortBy === 'Title') return a.title.localeCompare(b.title);
    return 0;
  });
};
