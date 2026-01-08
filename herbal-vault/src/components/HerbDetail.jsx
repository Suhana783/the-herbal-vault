import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../api/Post";

function HerbDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCommunityHerb, setIsCommunityHerb] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHerb, setEditedHerb] = useState(null);

  useEffect(() => {
    getPosts().then((data) => {
      const communityHerbs = JSON.parse(localStorage.getItem("communityHerbs")) || [];
      const allHerbs = [...data, ...communityHerbs];
      const found = allHerbs.find((h) => h.id === parseInt(id));
      const isCommunity = communityHerbs.some((h) => h.id === parseInt(id));
      setHerb(found);
      setEditedHerb(found);
      setIsCommunityHerb(isCommunity);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this herb?")) {
      const communityHerbs = JSON.parse(localStorage.getItem("communityHerbs")) || [];
      const updated = communityHerbs.filter((h) => h.id !== parseInt(id));
      localStorage.setItem("communityHerbs", JSON.stringify(updated));
      navigate("/");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const communityHerbs = JSON.parse(localStorage.getItem("communityHerbs")) || [];
    const updated = communityHerbs.map((h) => 
      h.id === parseInt(id) ? editedHerb : h
    );
    localStorage.setItem("communityHerbs", JSON.stringify(updated));
    setHerb(editedHerb);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedHerb(herb);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedHerb((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value) => {
    setEditedHerb((prev) => ({
      ...prev,
      [field]: value.split("\n").map((item) => item.trim()).filter(Boolean),
    }));
  };
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
            {isEditing ? (
              <textarea
                value={editedHerb.fullContent || editedHerb.body}
                onChange={(e) => handleInputChange("fullContent", e.target.value)}
                className="edit-textarea"
                rows="6"
              />
            ) : (
              <p>{herb.fullContent || herb.body}</p>
            )}
          </section>

          {herb.healthBenefits && herb.healthBenefits.length > 0 && (
            <section className="content-section">
              <h2>Health Benefits</h2>
              {isEditing ? (
                <textarea
                  value={editedHerb.healthBenefits.join("\n")}
                  onChange={(e) => handleArrayChange("healthBenefits", e.target.value)}
                  className="edit-textarea"
                  placeholder="One benefit per line"
                  rows="6"
                />
              ) : (
                <ul className="benefits-list">
                  {herb.healthBenefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {herb.growingTips && herb.growingTips.length > 0 && (
            <section className="content-section">
              <h2>Growing Tips</h2>
              {isEditing ? (
                <textarea
                  value={editedHerb.growingTips.join("\n")}
                  onChange={(e) => handleArrayChange("growingTips", e.target.value)}
                  className="edit-textarea"
                  placeholder="One tip per line"
                  rows="6"
                />
              ) : (
                <ul className="tips-list">
                  {herb.growingTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {isCommunityHerb && (
            <div className="action-buttons">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="action-btn save-btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="action-btn cancel-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="action-btn edit-btn">
                    Edit
                  </button>
                  <button onClick={handleDelete} className="action-btn delete-btn">
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default HerbDetail;
