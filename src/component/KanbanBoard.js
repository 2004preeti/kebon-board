import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('user');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.quicksell.co/v1/internal/frontend-assignment'
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const getUserName = (userId) =>
    users.find((user) => user.id === userId)?.name || 'Unknown';

  const getUserInitials = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (!user) return 'UN';
    const nameParts = user.name.split(' ');
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return (
          <img
            src="/icons_FEtask/UrgentPrioritygrey.svg"
            alt="Urgent"
            className="priority-icon"
          />
        );
      case 3:
        return (
          <img
            src="/icons_FEtask/UrgentPrioritycolour.svg"
            alt="High"
            className="priority-icon"
          />
        );
      case 2:
        return (
          <img
            src="/icons_FEtask/ImgMediumPriority.svg"
            alt="Medium"
            className="priority-icon"
          />
        );
      case 1:
        return (
          <img
            src="/icons_FEtask/ImgLowPriority.svg"
            alt="Low"
            className="priority-icon"
          />
        );
      default:
        return (
          <img
            src="/icons_FEtask/NoPriority.svg"
            alt="No Priority"
            className="priority-icon"
          />
        );
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      default:
        return 'No priority';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return (
          <img
            src="/icons_FEtask/Todo.svg"
            alt="To-do"
            className="status-icon"
          />
        );
      case 'In progress':
        return (
          <img
            src="/icons_FEtask/InProgress.svg"
            alt="In-progress"
            className="status-icon"
          />
        );
      case 'Backlog':
        return (
          <img
            src="/icons_FEtask/Backlog.svg"
            alt="Backlog"
            className="status-icon"
          />
        );
      default:
        return (
          <img
            src="/icons_FEtask/NoStatus.svg"
            alt="No Status"
            className="status-icon"
          />
        );
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sorting === 'priority') return b.priority - a.priority;
    if (sorting === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const key =
      grouping === 'user'
        ? ticket.userId
        : grouping === 'priority'
        ? ticket.priority
        : ticket.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  return (
    <div>
      <div className="header">
        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
          <option value="status">Group by Status</option>
          <option value="user">Group by User</option>
          <option value="priority">Group by Priority</option>
        </select>
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((groupKey) => {
          const ticketCount = groupedTickets[groupKey].length;
          return (
            <div key={groupKey} className="kanban-column">
              <div className="column-header">
                <div className="card-user-info">
                  {grouping === 'user' ? (
                    <div className="user-image">
                      {users.find((user) => user.id === groupKey)?.image ? (
                        <img
                          src={
                            users.find((user) => user.id === groupKey)?.image
                          }
                          alt="User"
                          className="user-img"
                        />
                      ) : (
                        <div className="user-initials custom-color">
                          {getUserInitials(groupKey)}
                        </div>
                      )}
                    </div>
                  ) : null}
                  <span className="group-name">
                    {grouping === 'user' ? (
                      getUserName(groupKey)
                    ) : grouping === 'priority' ? (
                      <>
                        {getPriorityIcon(parseInt(groupKey))}
                        {getPriorityLabel(parseInt(groupKey))}
                      </>
                    ) : (
                      <>
                        {getStatusIcon(groupKey)}
                        {groupKey}
                      </>
                    )}
                  </span>
                  <span className="ticket-count">({ticketCount})</span>
                </div>
                <div className="column-header-icons">
                  <img src="/icons_FEtask/add.svg" alt="Add" />
                  <img src="/icons_FEtask/3dotmenu.svg" alt="Menu" />
                </div>
              </div>
              <div className="card-container">
                {groupedTickets[groupKey].map((ticket) => (
                  <div key={ticket.id} className="kanban-card">
                    <div className="card-user-info">
                      <div className="user-image">
                        {users.find((user) => user.id === ticket.userId)
                          ?.image ? (
                          <img
                            src={
                              users.find((user) => user.id === ticket.userId)
                                ?.image
                            }
                            alt="User"
                            className="user-img"
                          />
                        ) : (
                          <div className="user-initials">
                            {getUserInitials(ticket.userId)}
                          </div>
                        )}
                      </div>
                      <span className="user-name">
                        {getUserName(ticket.userId)}
                      </span>
                      <span className="ticket-id">ID: {ticket.id}</span>
                    </div>
                    <div className="status-title-row">
                      {getStatusIcon(ticket.status)}
                      <h3 className="ticket-title">{ticket.title}</h3>
                    </div>
                    <div className="priority-tag-row">
                      {getPriorityIcon(ticket.priority)}
                      <span className="ticket-tags">
                        {ticket.tag.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
