import React from "react";

function ActionButtons({ handleSave, handleReset }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          background: "#f5f5f5",
          border: "1px solid gray",
          cursor: "pointer",
        }}
      >
        Reset
      </button>
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}

export default ActionButtons;
