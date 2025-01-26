import React, { useEffect, useState } from "react";
import RingVolumeIcon from "@mui/icons-material/RingVolume";

function RingingPhone() {
  const [isShaking, setIsShaking] = useState(true); // Controls the shake animation
  const [isRinging, setIsRinging] = useState(true); // Controls whether the phone is still ringing

  useEffect(() => {
    // Shake every 5 seconds, pause for 1 second
    const shakeInterval = setInterval(() => {
      setIsShaking((prev) => !prev);
    }, 6000); // Total 6 seconds (5 seconds shake + 1 second stop)

    // Stop ringing after 30 seconds
    const stopRingingTimeout = setTimeout(() => {
      setIsRinging(false);
      clearInterval(shakeInterval); // Stop the shake intervals
    }, 30000);

    // Cleanup intervals and timeouts
    return () => {
      clearInterval(shakeInterval);
      clearTimeout(stopRingingTimeout);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RingVolumeIcon
        fontSize="large"
        style={{
          color: isRinging ? "green" : "red", // Green when ringing, red after 30 seconds
          animation: isShaking ? "shake 0.5s infinite alternate" : "none", // Apply shake animation when isShaking is true
        }}
      />
      <style>
        {`
          @keyframes shake {
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(10deg); }
          }
        `}
      </style>
    </div>
  );
}

export default RingingPhone;
