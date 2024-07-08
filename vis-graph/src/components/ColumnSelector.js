import React from 'react';

const ColumnSelector = ({ columns, onColumnSelected }) => {
  const [nodeColumn, setNodeColumn] = React.useState('');
  const [relationshipColumn, setRelationshipColumn] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onColumnSelected(nodeColumn, relationshipColumn);
  };
  //form that lets user select node and relationship column
  //can add more cols to this in the future
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Node Column:
        <select value={nodeColumn} onChange={(e) => setNodeColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Relationship Column:
        <select value={relationshipColumn} onChange={(e) => setRelationshipColumn(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map(col => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ColumnSelector;
