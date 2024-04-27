import { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo1.png";
import { useNavigate, useLocation } from "react-router-dom";
function ResultsPage() {
  const [news, setNews] = useState("");
  const [generatedImage, setGeneratedImage] = useState(logo);
  const navigate = useNavigate();
  const location = useLocation();

  // sends the user back to the home page
  const handleSubmit = () => {
    navigate("/");
  };

  const { newsTopic, newsAnchor, newsId } = location.state || {
    newsTopic: "",
    newsAnchor: "",
    newsId: 0,
  };

  const getNewsAndImage = async () => {
    try {
      await fetch("http://localhost:5000/api/generate-newstext-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: newsTopic,
          anchor: newsAnchor,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNews(data.newsText);
          setGeneratedImage(data.imagePath);
        });
    } catch (err) {
      setNews("Error");
    }
  };

  const getNewsAndImageFromDatabase = async () => {
    try {
      await fetch("http://localhost:5000/api/get-news-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsID: newsId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNews(data.newsText);
          setGeneratedImage(data.imagePath);
        });
    } catch (err) {
      setNews("Error getting info from database", err);
    }
  };

  // fetches the news articles and generates the news text
  useEffect(() => {
    console.log(newsId);
    if (newsId > 0) {
      getNewsAndImageFromDatabase();
    } else {
      if (newsTopic !== "" && newsAnchor !== "") {
        getNewsAndImage();
      } else {
        setNews("Error");
      }
    }
  }, []);

  // splits the news text into sections
  const newsSections = news.split("\n\n").map((section, index) => (
    <div key={index} className="news-item">
      {section.split("\n").map((line, lineIndex) => (
        <p key={lineIndex}>{line}</p>
      ))}
    </div>
  ));

  const handleImageError = () => {
    setGeneratedImage(logo);
  };

  return (
    <div className="news-content">
      <h1>AI News Anchor</h1>
      <img
        src={generatedImage || logo}
        alt="Generated News Anchor"
        onError={handleImageError}
      />
      {newsSections}
      <button onClick={handleSubmit}>Home</button>
    </div>
  );
}

export default ResultsPage;
