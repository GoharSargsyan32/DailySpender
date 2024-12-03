import React from "react";

function RecordList({ records }) {
  return (
    <div>
      <h3>Saved Records</h3>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              {record.category} - ${record.amount} on {record.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecordList;
