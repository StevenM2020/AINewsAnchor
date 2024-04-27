import React from 'react';
import { useNavigate } from 'react-router-dom';

function RequestButton({ request }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/results', { state: { newsId: request.ID } });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ margin: "5px" }} 
    >
      {request.Topic} - {request.Anchor}
    </button>
  );
}

export default RequestButton;