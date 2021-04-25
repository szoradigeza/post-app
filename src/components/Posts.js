import React from "react";
import { Link } from "react-router-dom";
export const Posts = ({ posts }) => {
  return (
    <div className="posts container">
      <article>
        <h1>Posts</h1>
        <ul>
          {posts.length < 1 && <li key="empty">No posts yet!</li>}
          {posts.map((post) => (
            <li key={post.id}>
              <h2>
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>
                <Link to={`/edit/${post.slug}`}>Edit</Link>
              </p>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};
