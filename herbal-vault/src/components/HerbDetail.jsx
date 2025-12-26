import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../api/Post";

function HerbDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then((data) => {
      const communityHerbs = JSON.parse(localStorage.getItem("communityHerbs")) || [];
      const allHerbs = [...data, ...communityHerbs];
      const found = allHerbs.find((h) => h.id === parseInt(id));
      setHerb(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!herb) {
    return (
      <div className="not-found">
        <h2>Herb not found</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="herb-detail">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Articles
      </button>

      <article className="detail-container">
        <div className="detail-header">
          <img src={herb.image} alt={herb.title} className="detail-image" />
          <div className="detail-meta">
            <h1>{herb.title}</h1>
            <div className="tags">
              {herb.tags && herb.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="post-info">
              <span>{herb.date}</span>
              <span>• {herb.readTime}</span>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <section className="content-section">
            <h2>Overview</h2>
            <p>{herb.fullContent || herb.body}</p>
          </section>

          {herb.healthBenefits && herb.healthBenefits.length > 0 && (
            <section className="content-section">
              <h2>Health Benefits</h2>
              <ul className="benefits-list">
                {herb.healthBenefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}

          {herb.growingTips && herb.growingTips.length > 0 && (
            <section className="content-section">
              <h2>Growing Tips</h2>
              <ul className="tips-list">
                {herb.growingTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}

export default HerbDetail;
