import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import { useAuth } from "../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      alert("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center fw-bold">Post Feed</h2>

      {user && (
        <div className="mb-4 p-3 border rounded shadow-sm bg-light">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-center text-muted fst-italic">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-3">
            <PostCard post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
