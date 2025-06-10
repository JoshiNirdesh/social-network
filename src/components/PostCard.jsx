import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const isOwner = user && user.id === post.author._id;

  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${post._id}`);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return alert("Content cannot be empty");
    try {
      await API.put(`/posts/${post._id}`, { content: editContent });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update post");
    }
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      text: commentInput,
      author: user?.username || "Guest",
      timestamp: new Date().toLocaleString(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
  };

  return (
    <div className="card mb-3 shadow-sm rounded">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 className="mb-0 fw-bold">{post.author.username}</h6>
            <small className="text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
          {isOwner && !isEditing && (
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => setIsEditing(true)}
                aria-label="Edit Post"
              >
                ✏️
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
                aria-label="Delete Post"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        {/* Post Content or Edit Form */}
        {isEditing ? (
          <>
            <textarea
              className="form-control mb-2"
              rows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              disabled={false}
            />
            <div>
              <button className="btn btn-primary me-2" onClick={handleEdit}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="card-text mb-3">{post.content}</p>
        )}

        <hr />

        {/* Likes & Comments */}
        <div className="d-flex align-items-center mb-3 gap-3">
          <button
            className={`btn btn-sm d-flex align-items-center gap-1 ${
              isLiked ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={toggleLike}
            aria-pressed={isLiked}
            aria-label="Like Post"
          >
            <span>{isLiked ? "❤️" : "🤍"}</span> {likesCount}
          </button>

          <div className="d-flex align-items-center gap-1">
            <span>💬</span>
            <small>{comments.length}</small>
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <textarea
            className="form-control mb-2"
            rows={2}
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="mt-3">
          {comments.map((c, idx) => (
            <div
              key={idx}
              className="p-2 mb-2 bg-light rounded"
              style={{ fontSize: "0.9rem" }}
            >
              <strong>{c.author}</strong>: {c.text}
              <br />
              <small className="text-muted">{c.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
