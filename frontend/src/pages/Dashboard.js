import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import { io } from "socket.io-client";
import UserCard from "../components/UserCard";
import CallInviteForm from "../components/CallInviteForm";

const socket = io("http://localhost:3001");

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const uniqueId = user.sub.split("|")[1];
        setSessionId(uniqueId);

        socket.emit("register", uniqueId);
      } catch (error) {
        console.error("Error fetching session ID:", error);
      }
    };
    fetchSessionId();
  }, [user]);

  if (!isAuthenticated) {
    return <p>Please log in to access your dashboard.</p>;
  }

  const handleInviteSubmit = (callId) => {
    console.log(`Invite ID submitted: ${callId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card style={{ width: "1000px", padding: "20px", borderRadius: "12px" }}>
        <UserCard user={user} sessionId={sessionId} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center", flex: 1, marginRight: "10px" }}>
            <h5>Start Call</h5>
            <CallInviteForm onSubmit={handleInviteSubmit} />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
