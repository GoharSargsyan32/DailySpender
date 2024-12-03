import React, { useState } from "react";
import { ref, push, get } from "firebase/database";
import database from "./firebaseConfig";
import CategorySelector from "./components/CategorySelector";
import InputField from "./components/InputField";
import DatePicker from "./components/DatePicker";
import ActionButtons from "./components/ActionButtons";
import RecordList from "./components/RecordList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Сохранение данных в Firebase
  const handleSave = async () => {
    if (selectedCategory && amount && date) {
      const newRecord = {
        category: selectedCategory,
        amount: parseFloat(amount),
        date,
      };

      try {
        await push(ref(database, "records"), newRecord);
        alert("Record saved successfully!");
        setSelectedCategory("");
        setAmount("");
        setDate("");
      } catch (error) {
        console.error("Error saving record:", error);
        alert("Failed to save record.");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Загрузка данных из Firebase
  const fetchRecords = async () => {
    try {
      const snapshot = await get(ref(database, "records"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.values(data);
        setRecords(formattedData);
        setShowHistory(true);
      } else {
        setRecords([]);
        alert("No records found.");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      alert("Failed to load records.");
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Spender</h1>
      {!showHistory ? (
        <>
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <InputField amount={amount} setAmount={setAmount} />
          <DatePicker date={date} setDate={setDate} />
          <ActionButtons handleSave={handleSave} handleReset={handleReset} />
          <button
            onClick={fetchRecords}
            style={{
              padding: "10px 20px",
              background: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            History
          </button>
        </>
      ) : (
        <>
          <RecordList records={records} />
          <button
            onClick={() => setShowHistory(false)}
            style={{
              padding: "10px 20px",
              background: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default App;
