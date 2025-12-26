import { useNavigate } from "react-router-dom";

function PostCard({ id, title, body, image, tags, date, readTime }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/herb/${id}`);
  };

  return (
    <article className="post-card" onClick={handleCardClick} role="button" tabIndex={0}>
      <img src={image} alt={title} className="post-image" />

      <div className="post-content">
        <div className="tags">
          {tags && tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>

        <h3>{title}</h3>
        <p className="description">{body}</p>

        <div className="post-info">
          <span>{date}</span>
          <span>• {readTime}</span>
        </div>
      </div>
    </article>
  );
}

export default PostCard;