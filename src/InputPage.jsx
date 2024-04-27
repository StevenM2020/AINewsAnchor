import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import InputBox from "./components/InputBox";

function InputPage() {
  const [error, setError] = useState("");
  const [newsAnchor, setNewsAnchor] = useState("default");
  const [newsTopic, setNewsTopic] = useState("");

  const navigate = useNavigate();

  // sanitizes the input
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // sends the news topic and anchor to the ResultsPage
  const handleSubmit = () => {
    const sanitizedTopic = escapeHtml(newsTopic.trim());
    const sanitizedAnchor = escapeHtml(newsAnchor.trim());

    if (sanitizedTopic.trim() != "" && sanitizedAnchor.trim() != "") {
      navigate("/results", { state: { newsTopic, newsAnchor, newsId: 0 } });
    } else {
      setError("Error, please enter a news topic and anchor.");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="input-container">
        <h1>AI News Anchor</h1>
        <InputBox
          title="News Topic:"
          placeholder="ex: Gaming, Sports, Tech, AI etc."
          onChangeEvent={setNewsTopic}
        />
        <InputBox
          title="News Anchor Adjective:"
          placeholder="ex: Crazy, Funny, Robot etc."
          onChangeEvent={setNewsAnchor}
        />
        <button onClick={handleSubmit}>Get News</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default InputPage;
