import axios from "axios";

export const searchPosts = async (query) => {
  const res = await axios.get(
    `/api/posts/search?q=${encodeURIComponent(query)}`
  );
  return res.data;
};
