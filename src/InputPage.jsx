import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
function InputPage() {
  const [error, setError] = useState("");
  const [newsAnchor, setNewsAnchor] = useState("default");
  const [newsTopic, setNewsTopic] = useState("");
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
        navigate('/results', { state: { newsTopic, newsAnchor } });
       }else{
        setError('Error, please enter a news topic and anchor.');
       }
    
  };

  return (
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
  );
}

export default InputPage;
