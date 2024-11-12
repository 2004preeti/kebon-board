import React from 'react';
import { PRIORITY_LEVELS } from '../utils/constants';

const Ticket = ({ ticket, getUserName }) => {
  return (
    <tr>
      <td>{ticket.status}</td>
      <td>{getUserName(ticket.userId)}</td>
      <td className={`priority-${ticket.priority}`}>
        {PRIORITY_LEVELS[ticket.priority]}
      </td>
      <td>{ticket.id}</td>
      <td>{ticket.title}</td>
      <td>{PRIORITY_LEVELS[ticket.priority]}</td>
      <td>{ticket.title}</td>
      <td>{ticket.tag.join(', ')}</td>
    </tr>
  );
};

export default Ticket;
