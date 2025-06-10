import { useState } from "react";
import API from "../api/axios";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const res = await API.post("/posts", { content });
      setContent("");
      onPostCreated(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 shadow p-4 rounded bg-white">
      <div className="mb-3">
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="What's on your mind?"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Posting...
          </>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
};

export default CreatePost;
