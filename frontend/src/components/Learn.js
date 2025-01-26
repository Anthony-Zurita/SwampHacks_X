// Inspiration for how to implement and use react-webcam https://www.youtube.com/watch?v=0HJ1cMBkWJ4&ab_channel=SyedZano

import React, { useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Webcam from "react-webcam";
import { useAuth0 } from "@auth0/auth0-react";
import LetterPractice from "./ASLPractice";

const Learn = () => {

// below are the hooks to manage the different states of the practice component
  const { isAuthenticated } = useAuth0();
  const [showWebcam, setShowWebcam] = useState(false);


  const webcamRef = React.useRef(null);

// the size of the video feed being displayed
  const videoConstraints = {
    width: 720,
    height: 540,
    facingMode: "user"
  };

// if the user is not authenticated, display a message to login
  if (!isAuthenticated) {
    return (
      <Container className="mt-4">
        <h1>Please login to access learning materials</h1>
      </Container>
    );
  }

// the main component that displays the instructions and practice area
  return (
    <Container fluid className="mt-4">
      {!showWebcam ? (
        <Card className="p-4">
          <h1 className="mb-4">Learn American Sign Language (ASL)</h1>
          <div className="mb-4">
            <h3>Instructions:</h3>
            <p>
              1. Position yourself in a well-lit area facing the camera<br />
              2. Keep your hand visible within the camera frame<br />
              3. Make signs clearly and hold them steady<br />
              4. Follow the prompts to practice different letters and signs
            </p>
            <h3>ASL Sign Reference Table:</h3>
            <div
              style={{
                backgroundImage: "url('https://www.lingvano.com/asl/wp-content/uploads/sites/3/2022/11/Sign_alphabet_chart_abc.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh',
                width: '100vh',
                position: 'relative'
              }}
            ></div>
          </div>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => setShowWebcam(true)}
          >
            Start Learning
          </Button>
        </Card>
      ) : (
        <div className="learning-layout px-4 px-md-5">
          <Row className="mt-4">
            <Col xs={12} className="d-flex justify-content-between align-items-center mb-4">
              <h1>Practice Area</h1>
              <Button 
                variant="secondary" 
                onClick={() => setShowWebcam(false)}
              >
                Back to Instructions
              </Button>
            </Col>
          </Row>

          <Row>
            {/* Left column with Letter Practice and ASL Reference */}
            <Col xs={12} md={6}>
              {/* Letter Practice Component */}
              <div className="mb-1">
                <LetterPractice />
              </div>
              
              {/* ASL Reference Table */}
              <div
                style={{
                  backgroundImage: "url('https://www.lingvano.com/asl/wp-content/uploads/sites/3/2022/11/Sign_alphabet_chart_abc.jpg')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  height: '540px',
                  width: '100%'
                }}
              ></div>
            </Col>

            {/* Right column with Webcam feed*/}
            <Col xs={12} md={6}>
              <div>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Learn;
