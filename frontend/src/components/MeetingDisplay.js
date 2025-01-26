import React from "react";

function MeetingDisplay({ name, profileImage }) {
  return (
    <div
      className="d-flex flex-column align-items-center bg-light p-3 rounded shadow"
      style={{ width: "300px", height: "400px" }}
    >
      {/* Profile Image or Custom Element */}
      <div
        className="rounded-circle mb-3 d-flex justify-content-center align-items-center"
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#e9ecef",
        }}
      >
        {React.isValidElement(profileImage) ? (
          profileImage
        ) : (
          <img
            src={profileImage || "https://via.placeholder.com/100"}
            alt={`${name}'s profile`}
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
      </div>

      {/* Participant Name */}
      <h3 className="text-center">{name || "Ringing..."}</h3>

      {/* Control Buttons */}
      <div className="mt-auto d-flex justify-content-between w-100">
        <button className="btn btn-primary w-100 mx-1">Mute</button>
        <button className="btn btn-secondary w-100 mx-1">Camera</button>
        <button className="btn btn-danger w-100 mx-1">Hang Up</button>
      </div>
    </div>
  );
}

export default MeetingDisplay;
