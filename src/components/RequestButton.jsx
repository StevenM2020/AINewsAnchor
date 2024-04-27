import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequestButton({ request }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    navigate("/results", { state: { newsId: request.ID } });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ margin: "5px" }}
    >
      {isHovered ? (
        <>
          <span>Topic: {request.Topic}</span>
          <br />
          <span>Anchor: {request.Anchor}</span>
          <br />
          <span>Date: {new Date(request.Date).toLocaleDateString()}</span>
        </>
      ) : (
        <span>{request.Topic}</span>
      )}
    </button>
  );
}

export default RequestButton;
