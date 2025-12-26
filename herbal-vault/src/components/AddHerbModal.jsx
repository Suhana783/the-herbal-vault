import { useState } from "react";

function AddHerbModal({ isOpen, onClose, onAddHerb }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    tags: "",
    fullContent: "",
    healthBenefits: "",
    growingTips: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHerb = {
      id: Date.now(),
      title: formData.title,
      body: formData.body,
      image: formData.image || "/src/assets/herb-placeholder.jpg",
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      fullContent: formData.fullContent || formData.body,
      healthBenefits: formData.healthBenefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter(Boolean),
      growingTips: formData.growingTips
        .split("\n")
        .map((tip) => tip.trim())
        .filter(Boolean),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: "5 min read",
    };

    onAddHerb(newHerb);
    setFormData({
      title: "",
      body: "",
      image: "",
      tags: "",
      fullContent: "",
      healthBenefits: "",
      growingTips: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Your Herb</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="herb-form">
          <div className="form-group">
            <label htmlFor="title">Herb Name *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Peppermint"
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Short Description *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              placeholder="Brief overview of the herb"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullContent">Full Content</label>
            <textarea
              id="fullContent"
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              placeholder="Detailed description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/herb.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated) *</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              placeholder="e.g., Medicinal, Wellness, Culinary"
            />
          </div>

          <div className="form-group">
            <label htmlFor="healthBenefits">Health Benefits (one per line)</label>
            <textarea
              id="healthBenefits"
              name="healthBenefits"
              value={formData.healthBenefits}
              onChange={handleChange}
              placeholder="Boosts immunity&#10;Anti-inflammatory&#10;Aids digestion"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="growingTips">Growing Tips (one per line)</label>
            <textarea
              id="growingTips"
              name="growingTips"
              value={formData.growingTips}
              onChange={handleChange}
              placeholder="Prefers sunny locations&#10;Water regularly&#10;Harvest in the morning"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Herb
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHerbModal;
