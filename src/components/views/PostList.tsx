import React, { useEffect, useState } from "react";
import "../../styles/views/PostList.scss";
import { Post } from "models/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface PostListProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (postId: string, voteType: "upvote" | "downvote") => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/forum" } });
      
      return;
    }

    try {
      const response = await api.post(`/api/forum/posts/${postId}/${voteType}`, null, {
        params: { userId: user.uid },
      });
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    } catch (error) {
      console.error(`Error during ${voteType}:`, handleError(error));
    }
  };

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-footer">
              <div className="votes">
                <button
                  className={`vote-button upvote ${post.upVoteIds.includes(user?.uid) ? "voted" : ""}`}
                  onClick={() => handleVote(post.id, "upvote")}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span>{post.upVoteIds.length}</span>
                </button>
                <button
                  className={`vote-button downvote ${post.downVoteIds.includes(user?.uid) ? "voted" : ""}`}
                  onClick={() => handleVote(post.id, "downvote")}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span>{post.downVoteIds.length}</span>
                </button>
              </div>
              <p className="timestamp">{new Date(post.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
