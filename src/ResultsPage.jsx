import { useState, useEffect } from "react";
import "./App.css";
import logo from './assets/logo1.png';
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

  const { newsTopic, newsAnchor } = location.state || {
    newsTopic: "",
    newsAnchor: "",
  };

  useEffect(() => {

    // fetches the news articles and generates the news text
    const getNews = async () => {
      try {
        await fetch("http://localhost:5000/api/news", {
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
            setNews(data);
          });
      } catch (err) {
        setNews("Error");
      }
    };

    // fetches the generated image of the news anchor
    const getGeneratedImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/generate-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ anchor: newsAnchor }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGeneratedImage(data.image); // Assuming you have a state hook for this
      } catch (error) {
        console.error("Error fetching generated image: ", error);
      }
    };

    if (newsTopic != "" && newsAnchor != "") {
      getGeneratedImage();
      getNews();
    } else {
      setNews("Error, please enter a news topic and anchor.");
    }
  }, [newsTopic, newsAnchor]);

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
        <img src={generatedImage || logo} alt="Generated News Anchor" onError={handleImageError} />
      {newsSections}
      <button onClick={handleSubmit}>Home</button>
    </div>
  );
}

export default ResultsPage;