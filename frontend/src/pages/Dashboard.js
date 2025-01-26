import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import UserCard from "../components/UserCard";
import CallInviteForm from "../components/CallInviteForm";
import { Navigate } from "react-router-dom";

const socket = io("http://localhost:3001");

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [sessionId, setSessionId] = useState("");
  const [redirectData, setRedirectData] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    // Fetch Session ID and Register User
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
  useEffect(() => {
    // Listen for incoming-call
    socket.on("incoming-call", ({ from, offer }) => {
      console.log(`Incoming call from: ${from}`);
      setIncomingCall({ from, offer });
    });

    // Listen for call-answered
    socket.on("call-answered", ({ answer }) => {
      if (peerConnection.current) {
        console.log("starting rtc");
        peerConnection.current
          .setRemoteDescription(new RTCSessionDescription(answer))
          .then(() => {
            console.log("Call connected!");
          })
          .catch((error) => {
            console.error("Error setting remote description:", error);
          });
      } else {
        console.error("No active peer connection found.");
      }
    });

    // Clean up listeners on unmount
    return () => {
      socket.off("incoming-call");
      socket.off("call-answered");
    };
  }, []);

  if (!isAuthenticated) {
    return <p>Please log in to access your dashboard.</p>;
  }

  const handleInviteSubmit = (callId) => {
    if (!callId.trim()) {
      alert("Please enter a valid ID.");
      return;
    }

    peerConnection.current = new RTCPeerConnection(); // Initialize peer connection

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));

        return peerConnection.current.createOffer();
      })
      .then((offer) => {
        return peerConnection.current.setLocalDescription(offer).then(() => {
          const userId = user.sub.split("|")[1];
          socket.emit("call-user", { targetId: callId, offer, userId });
          console.log(`Offer sent to ${callId}`);
          setRedirectData({ callId, user });
        });
      })
      .catch((error) => {
        console.error("Error during WebRTC setup:", error);
        alert("Failed to initiate call. Please try again.");
      });
  };

  const handleAnswer = () => {
    peerConnection.current = new RTCPeerConnection(); // Initialize peer connection

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));

        return peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(incomingCall.offer)
        );
      })
      .then(() => {
        return peerConnection.current.createAnswer();
      })
      .then((answer) => {
        return peerConnection.current.setLocalDescription(answer).then(() => {
          socket.emit("call-accepted", {
            targetId: incomingCall.from,
            answer,
          });
          console.log(
            "Emitting call-accepted with targetId:",
            incomingCall.from
          );

          console.log("Call accepted and answer sent!");
          setIncomingCall(null);
          setRedirectData({ from: incomingCall.from, user });
        });
      })
      .catch((error) => {
        console.error("Error handling call acceptance:", error);
      });
  };

  const handleDecline = () => {
    console.log("Call declined!");
    setIncomingCall(null); // Close the modal
  };

  if (redirectData) {
    return (
      <Navigate
        to={{
          pathname: "/meeting",
          state: { redirectData },
        }}
      />
    );
  }

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
      {incomingCall && (
        <Modal show={true} onHide={handleDecline} centered>
          <Modal.Header closeButton>
            <Modal.Title>Incoming Call</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You have an incoming call from {incomingCall.from}.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDecline}>
              Decline
            </Button>
            <Button variant="success" onClick={handleAnswer}>
              Answer
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
