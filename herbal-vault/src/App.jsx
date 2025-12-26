import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getPosts } from "./api/Post";
import PostCard from "./components/PostCard";
import HerbDetail from "./components/HerbDetail";
import AddHerbModal from "./components/AddHerbModal";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [communityHerbs, setCommunityHerbs] = useState([]);
  const [activeTab, setActiveTab] = useState("official");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPosts().then((data) => setPosts(data.slice(0, 9)));
    const saved = JSON.parse(localStorage.getItem("communityHerbs")) || [];
    setCommunityHerbs(saved);
  }, []);

  const handleAddHerb = (newHerb) => {
    const updated = [...communityHerbs, newHerb];
    setCommunityHerbs(updated);
    localStorage.setItem("communityHerbs", JSON.stringify(updated));
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="hero">
                <h1>Herbal Haven</h1>
                <p>
                  Discover the healing power of nature through herbs, their benefits, and traditional remedies.
                </p>
              </header>

              <div className="container">
                {/* Navigation Toggle */}
                <div className="nav-toggle">
                  <button 
                    className={`nav-btn ${activeTab === "official" ? "active" : ""}`}
                    onClick={() => setActiveTab("official")}
                  >
                    Official Articles
                  </button>
                  <button 
                    className={`nav-btn ${activeTab === "community" ? "active" : ""}`}
                    onClick={() => setActiveTab("community")}
                  >
                    Community Herbs
                  </button>
                </div>

                <h2 className="section-title">
                  {activeTab === "official" ? "Latest Articles" : "Community Contributions"}
                </h2>

                {activeTab === "community" && (
                  <button 
                    className="add-herb-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    + Add Your Herb
                  </button>
                )}

                <div className="grid">
                  {(activeTab === "official" ? posts : communityHerbs).map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      image={post.image}
                      tags={post.tags}
                      date={post.date}
                      readTime={post.readTime}
                    />
                  ))}
                </div>

                {activeTab === "community" && communityHerbs.length === 0 && (
                  <div className="empty-state">
                    <p>No community herbs yet. Be the first to contribute!</p>
                    <button 
                      className="add-herb-btn"
                      onClick={() => setIsModalOpen(true)}
                    >
                      + Add Your Herb
                    </button>
                  </div>
                )}
              </div>

              <footer className="footer">© 2025 Herbal Haven</footer>

              <AddHerbModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddHerb={handleAddHerb}
              />
            </>
          }
        />
        <Route path="/herb/:id" element={<HerbDetail />} />
      </Routes>
    </>
  );
}

export default App;