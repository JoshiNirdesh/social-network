import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    };
    const fetchPosts = async () => {
      const res = await API.get("/posts");
      setPosts(res.data.filter((p) => p.author._id === id));
    };
    fetchProfile();
    fetchPosts();
  }, [id]);

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "3rem" }}>
      <h2 className="mb-3">
        {user.username ? `${user.username}'s Profile` : "Profile"}
      </h2>

      <div className="d-flex flex-column align-items-center mb-4">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaUserCircle size={100} color="#6c757d" />
        )}
        <p className="text-center text-muted mt-3">
          {user.bio || "No bio yet"}
        </p>
      </div>

      <h4 className="mb-3">Posts</h4>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p className="text-muted">No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;
