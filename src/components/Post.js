import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Post = ({ post, deletePost }) => {
  const { user } = useContext(UserContext);

  return (
    <article className="post container">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {user.isAuthenticated && (
        <p>
          <Link to={`/edit/${post.slug}`}>Edit</Link>
          {" | "}
          <button className="linkLike" onClick={() => deletePost(post)}>
            Delete
          </button>
        </p>
      )}
    </article>
  );
};

export default Post;
