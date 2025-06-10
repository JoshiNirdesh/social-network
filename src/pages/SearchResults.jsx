// pages/SearchResults.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard"; // Your existing post UI component

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/search?q=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching search results", err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Search Results for "<span className="italic text-black">{query}</span>"
      </h2>

      {results.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          <p>No posts found. Try a different keyword.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
