import React from "react";

function DatePicker({ date, setDate }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select Date</h3>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
    </div>
  );
}

export default DatePicker;
