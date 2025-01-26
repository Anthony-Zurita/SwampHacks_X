import React, { useState } from "react";

function CallInviteForm({ onSubmit }) {
  const [callId, setCallId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (callId.trim()) {
      onSubmit(callId);
      setCallId(""); // Clear the input field after submission
    } else {
      alert("Please enter a valid call ID.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Insert invite call ID"
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default CallInviteForm;
