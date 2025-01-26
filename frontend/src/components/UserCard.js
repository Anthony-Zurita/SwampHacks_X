import React from "react";

function UserCard({ user, sessionId }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <img
        src={user.picture}
        alt="User"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginRight: "20px",
        }}
      />
      <div>
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        <p style={{ color: "gray", fontSize: "14px" }}>
          Call Invite ID: {sessionId}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
