import React from "react";

function InputField({ amount, setAmount }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Enter Amount</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        style={{ padding: "10px", width: "200px", fontSize: "16px" }}
      />
    </div>
  );
}

export default InputField;
