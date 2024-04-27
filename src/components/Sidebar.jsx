import React, { useState, useEffect } from "react";
import RequestButton from "./RequestButton";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const getNewsRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/last-news-requests",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching last news requests:", err);
    }
  };

  useEffect(() => {
    getNewsRequests();
  }, []);

  return (
    <div className="sidebar">
      <h2>Recent Requests</h2>
      {requests.map((request, index) => (
        <RequestButton
          key={index}
          request={request}
          onClick={() => handleRequestClick(request.ID)}
        />
      ))}
    </div>
  );
}

export default Sidebar;
