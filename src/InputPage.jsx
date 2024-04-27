import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import RequestButton from './components/RequestButton';

function InputPage() {
  const [error, setError] = useState("");
  const [newsAnchor, setNewsAnchor] = useState("default");
  const [newsTopic, setNewsTopic] = useState("");
  const [requests, setRequests] = useState([]);


  const navigate = useNavigate();

 // sanitizes the input
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // sends the news topic and anchor to the ResultsPage
  const handleSubmit = () => {

    const sanitizedTopic = escapeHtml(newsTopic.trim());
    const sanitizedAnchor = escapeHtml(newsAnchor.trim());

    if (sanitizedTopic .trim() != '' && sanitizedAnchor.trim() != ''){
        navigate('/results', { state: { newsTopic, newsAnchor,newsId: 0 } });
       }else{
        setError('Error, please enter a news topic and anchor.');
       }
    
  };

  useEffect(() => {
    const getNewsRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/last-news-requests", {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
        setRequests(data); 
      } catch (err) {
        console.error("Error fetching last news requests:", err);
        setNews("Error fetching news requests"); 
      }
    };
  
    getNewsRequests();
  }, []);
  
  
  const handleRequestClick = (newsId) => {
    navigate('/results', { state: { newsTopic, newsAnchor, newsId } });
  };

  return (

    <div className="container">

<div className="sidebar">
    <h2>Recent Requests</h2>
    {requests.map((request, index) => (
      <RequestButton key={index} request={request} onClick={handleRequestClick} />
    ))}
  </div>


  <div className="input-container">

      <h1>AI News Anchor</h1>
      <label htmlFor="newsTopic">News Topic:</label>
      <textarea
        id="newsTopic"
        onChange={(e) => setNewsTopic(e.target.value)}
        placeholder="ex: Gaming, Sports, Tech, AI etc."
      />
      <label htmlFor="newsAnchor">News Anchor Adjective:</label>
      <textarea
        id="newsAnchor"
        onChange={(e) => setNewsAnchor(e.target.value)}
        placeholder="ex: Crazy, Funny, Batman etc."
      />
      <button onClick={handleSubmit}>Get News</button>
      {error && <div className="error-message">{error}</div>}

      </div>
    </div>
  );
}

export default InputPage;
