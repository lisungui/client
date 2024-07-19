import React, { useEffect, useState } from "react";
import "../../styles/views/PostList.scss";
import { Post } from "models/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faUser, faReply } from "@fortawesome/free-solid-svg-icons";
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
  const [usersData, setUsersData] = useState<Record<string, any>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const uniqueUserIds = Array.from(new Set(posts.map((post) => post.userId)));
      const usersData = await Promise.all(
        uniqueUserIds.map(async (uid) => {
          try {
            const response = await api.get(`/users/${uid}`);

            return { uid, data: response.data };
          } catch (error) {
            console.error("Failed to fetch user data from post list:", error);

            return { uid, data: null };
          }
        })
      );
      const usersDataMap = Object.fromEntries(usersData.map(({ uid, data }) => [uid, data]));
      setUsersData(usersDataMap);
    };

    if (posts.length > 0) {
      fetchUsersData();
    }
  }, [posts]);

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
        prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error(`Error during ${voteType}:`, handleError(error));
    }
  };

  const handleReply = async (postId: string) => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/forum" } });

      return;
    }

    if (replyContent.trim() === "") {
      alert("Reply content cannot be empty.");

      return;
    }

    const parentPost = posts.find((post) => post.id === postId);

    if (!parentPost) {
      alert("The post you are trying to reply to does not exist.");
      
      return;
    }

    try {
      const payload = {
        categoryId: parentPost.categoryId,
        userId: user.uid,
        title: `Re: ${parentPost.title}`,
        content: replyContent,
        commentIds: [],
        upVoteIds: [],
        downVoteIds: [],
        postReplies: [],
        timestamp: new Date().toISOString(),
      };
      const response = await api.post(`/api/forum/posts/${postId}/reply`, payload);
      const newReply = response.data;

      // Update the parent post with the new reply ID
      const updatedParentPost = {
        ...parentPost,
        postReplies: [...parentPost.postReplies, newReply.id],
      };

      setPosts((prevPosts) =>
        prevPosts
          .map((post) =>
            post.id === updatedParentPost.id ? updatedParentPost : post
          )
          .concat(newReply)
      );
      setReplyingTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error during reply:", handleError(error));
    }
  };

  const renderReplies = (replyIds: string[]) => {
    return replyIds.map((replyId) => {
      const replyPost = posts.find((p) => p.id === replyId);
      const replyUserData = usersData[replyPost?.userId || ""];

      return replyPost ? (
        <div key={replyPost.id} className="reply-item">
          <div className="post-user-info">
            {replyUserData?.picture ? (
              <img src={replyUserData.picture} alt="User" className="post-user-picture" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="post-user-icon" />
            )}
            <span className="post-user-name">{replyUserData?.firstName}</span>
          </div>
          <p>{replyPost.content}</p>
          <div className="post-footer">
            <div className="votes">
              <button
                className={`vote-button upvote ${replyPost.upVoteIds.includes(user?.uid) ? "voted" : ""}`}
                onClick={() => handleVote(replyPost.id, "upvote")}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{replyPost.upVoteIds.length}</span>
              </button>
              <button
                className={`vote-button downvote ${replyPost.downVoteIds.includes(user?.uid) ? "voted" : ""}`}
                onClick={() => handleVote(replyPost.id, "downvote")}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{replyPost.downVoteIds.length}</span>
              </button>
            </div>
            <button className="reply-button" onClick={() => setReplyingTo(replyPost.id)}>
              <FontAwesomeIcon icon={faReply} />
            </button>
            <p className="timestamp">{new Date(replyPost.timestamp).toLocaleString()}</p>
          </div>
          {replyingTo === replyPost.id && (
            <div className="reply-box">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply here..."
              />
              <div className="reply-actions">
                <button onClick={() => handleReply(replyPost.id)}>Post</button>
                <button onClick={() => setReplyingTo(null)} className="cancel-button">Cancel</button>
              </div>
            </div>
          )}
          {renderReplies(replyPost.postReplies)}
        </div>
      ) : null;
    });
  };

  return (
    <div className="post-list-container">
      <div className="post-list">
        {posts.filter(post => !posts.some(p => p.postReplies.includes(post.id))).length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts
            .filter(post => !posts.some(p => p.postReplies.includes(post.id)))
            .map((post) => {
              const userData = usersData[post.userId];

              return (
                <div key={post.id} className="post-item">
                  <div className="post-user-info">
                    {userData?.picture ? (
                      <img src={userData.picture} alt="User" className="post-user-picture" />
                    ) : (
                      <FontAwesomeIcon icon={faUser} className="post-user-icon" />
                    )}
                    <span className="post-user-name">{userData?.firstName}</span>
                  </div>
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
                    <button className="reply-button" onClick={() => setReplyingTo(post.id)}>
                      <FontAwesomeIcon icon={faReply} />
                    </button>
                    <p className="timestamp">{new Date(post.timestamp).toLocaleString()}</p>
                  </div>
                  {replyingTo === post.id && (
                    <div className="reply-box">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply here..."
                      />
                      <div className="reply-actions">
                        <button onClick={() => handleReply(post.id)}>Post</button>
                        <button onClick={() => setReplyingTo(null)} className="cancel-button">Cancel</button>
                      </div>
                    </div>
                  )}
                  {renderReplies(post.postReplies)}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default PostList;

