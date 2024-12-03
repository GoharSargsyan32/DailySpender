import React from "react";

function CategorySelector({ selectedCategory, setSelectedCategory }) {
  const categories = ["Food", "Shopping", "Car", "Payments", "Leisure"];

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select a Category</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "10px 20px",
              border: selectedCategory === category ? "2px solid red" : "1px solid gray",
              background: selectedCategory === category ? "#f5f5f5" : "#fff",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
