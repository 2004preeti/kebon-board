import React from 'react';

const Controls = ({ viewState, onViewStateChange }) => {
  return (
    <div className="controls">
      <label>
        Group by:
        <select
          value={viewState.grouping}
          onChange={(e) => onViewStateChange('grouping', e.target.value)}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>
      <label>
        Sort by:
        <select
          value={viewState.sorting}
          onChange={(e) => onViewStateChange('sorting', e.target.value)}
        >
          <option value="Priority">Priority</option>
          <option value="Title">Title</option>
        </select>
      </label>
    </div>
  );
};

export default Controls;
