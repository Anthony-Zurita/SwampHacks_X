import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import UserCard from "../components/UserCard";
import CallInviteForm from "../components/CallInviteForm";

const socket = io("http://localhost:3001");

function Dashboard() {
  const { user, isAuthenticated } = useAuth0();
  const [sessionId, setSessionId] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);
  const peerConnection = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Register user
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

    // Listen for incoming call
    socket.on("incoming-call", ({ from, offer }) => {
      console.log(`Incoming call from: ${from}`);
      setIncomingCall({ from, offer });
    });

    // Listen for call answered
    socket.on("call-answered", ({ answer }) => {
      if (
        peerConnection.current &&
        peerConnection.current.signalingState === "have-local-offer"
      ) {
        peerConnection.current
          .setRemoteDescription(new RTCSessionDescription(answer))
          .then(() => {
            console.log("Call connected!");
          })
          .catch((error) => {
            console.error("Error setting remote description:", error);
          });
      } else {
        console.warn("Ignoring redundant call-answered event.");
      }
    });

    // Listen for ICE candidates
    socket.on("ice-candidate", ({ candidate }) => {
      if (candidate && peerConnection.current) {
        peerConnection.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .then(() => console.log("ICE candidate added successfully"))
          .catch((error) =>
            console.error("Error adding ICE candidate:", error)
          );
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-answered");
      socket.off("ice-candidate");
    };
  }, [user]);

  const handleInviteSubmit = (callId) => {
    if (!callId.trim()) {
      alert("Please enter a valid ID.");
      return;
    }

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          targetId: callId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      // Attach remote stream to video element
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Attach local stream to video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

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
        });
      })
      .catch((error) => {
        console.error("Error during WebRTC setup:", error);
        alert("Failed to initiate call. Please try again.");
      });
  };

  const handleAnswer = () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          targetId: incomingCall.from,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      // Attach remote stream to video element
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Attach local stream to video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));

        return peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(incomingCall.offer)
        );
      })
      .then(() => peerConnection.current.createAnswer())
      .then((answer) => {
        return peerConnection.current.setLocalDescription(answer).then(() => {
          socket.emit("call-accepted", {
            targetId: incomingCall.from,
            answer,
          });
          console.log("Answer sent!");
          setIncomingCall(null); // Close the modal after answering
        });
      })
      .catch((error) => {
        console.error("Error handling call acceptance:", error);
      });
  };

  const handleDecline = () => {
    console.log("Call declined!");
    setIncomingCall(null); // Close the modal after declining
  };

  return (
    <div>
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

      <Card>
        <UserCard user={user} sessionId={sessionId} />
        <CallInviteForm onSubmit={handleInviteSubmit} />
      </Card>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{
            width: "300px",
            marginRight: "20px",
            border: "1px solid black",
          }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ width: "300px", border: "1px solid black" }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
