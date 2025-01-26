// Inspiration for how to implement react-webcam https://www.youtube.com/watch?v=0HJ1cMBkWJ4&ab_channel=SyedZano

import React, { useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useAuth0 } from '@auth0/auth0-react';

const Learn = () => {
    const { isAuthenticated } = useAuth0();
    const [showWebcam, setShowWebcam] = useState(false);
  
    const webcamRef = React.useRef(null);
  
    const videoConstraints = {
      width: 480,  // Reduced for right-side positioning
      height: 360,
      facingMode: "user"
    };
  
    if (!isAuthenticated) {
      return (
        <Container className="mt-4">
          <h2>Please login to access learning materials</h2>
        </Container>
      );
    }
  
    return (
      <Container fluid className="mt-4">
        {!showWebcam ? (
          <Card className="p-4">
            <h1 className="mb-4">Learn Sign Language</h1>
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
                className="asl-table-container"
                style={{
                  backgroundImage: "url('https://www.lingvano.com/asl/wp-content/uploads/sites/3/2022/11/Sign_alphabet_chart_abc.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '125vh',
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
          <div className="learning-layout">
            <Row>
              <Col xs={12} className="text-center mb-4">
                <h2>Practice Area</h2>
              </Col>
            </Row>
            <Row>
              {/* Left side for ASL reference */}
              <Col xs={12} md={4} className="reference-area">
                <div 
                  className="asl-reference-small"
                  style={{
                    backgroundImage: "url('https://www.lingvano.com/asl/wp-content/uploads/sites/3/2022/11/Sign_alphabet_chart_abc.jpg')",
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '360px',
                    width: '100%'
                  }}
                ></div>
              </Col>
  
              {/* Center area for controls/info */}
              <Col xs={12} md={4} className="text-center control-area">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowWebcam(false)}
                  className="mb-3"
                >
                  Back to Instructions
                </Button>
                {/* Space for additional controls */}
              </Col>
  
              {/* Right side webcam */}
              <Col xs={12} md={4} className="webcam-area">
                <div className="webcam-container">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="webcam-feed"
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