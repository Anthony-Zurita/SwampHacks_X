import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MeetingDisplay from "../components/MeetingDisplay";
import { useAuth0 } from "@auth0/auth0-react";
import RingingPhone from "../components/RingingPhone";

function Meeting() {
  const { user } = useAuth0();
  const [isRinging, setIsRinging] = useState(true); // State to control ringing animation

  const caller = {
    name: user?.name,
    profileImage: user.picture,
  };

  const callee = {
    name: isRinging ? "" : "Callee", // Hide name while ringing
    profileImage: isRinging ? null : "https://via.placeholder.com/100", // Show profile after answering
  };

  const handleAnswer = () => {
    setIsRinging(false);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-secondary"
    >
      <Row className="w-75 justify-content-around">
        {/* Caller Display */}
        <Col xs={12} sm={6} className="d-flex justify-content-center">
          <MeetingDisplay
            name={caller.name}
            profileImage={caller.profileImage}
          />
        </Col>

        {/* Callee Display */}
        <Col xs={12} sm={6} className="d-flex justify-content-center">
          <MeetingDisplay
            name={callee.name}
            profileImage={
              isRinging ? <RingingPhone /> : callee.profileImage // Show ringing animation or profile image
            }
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Meeting;
