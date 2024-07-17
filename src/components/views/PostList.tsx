import React from "react";
import "../../styles/views/PostList.scss";

interface Post {
  id: string;
  category: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.category}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;