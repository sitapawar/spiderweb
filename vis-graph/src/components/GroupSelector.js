import React from 'react';

const GroupSelector = ({ groups, selectedGroup, onGroupChange }) => {
  return (
    <div>
      <label>Select Group: </label>
      <select value={selectedGroup} onChange={(e) => onGroupChange(e.target.value)}>
        <option value="All">All</option>
        {groups.map((group, index) => (
          <option key={index} value={group}>
            {group}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupSelector;