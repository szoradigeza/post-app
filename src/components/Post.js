import React from "react";

const Post = ({ post }) => {
  return (
    <article className="post container">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};

export default Post;
