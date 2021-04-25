import React, { useEffect, useRef, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  Editor,
  EditorState,
} from "draft-js";
import { Redirect } from "react-router";
import { stateToHTML } from "draft-js-export-html";

export const PostForm = ({ post: propsPost, addNewPost, updatePost }) => {
  const [post, setPost] = useState({ ...propsPost });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(post.content))
    )
  );
  const [saved, setSaved] = useState(false);

  const editor = useRef(null);
  const focusEditor = () => editor.current.focus();

  const handlePostForm = (e) => {
    e.preventDefault();
    if (post.title) {
      let newPost = post;
      newPost.content = stateToHTML(editorState.getCurrentContent());
      console.log(newPost);
      updatePost ? updatePost(newPost) : addNewPost(newPost);
      console.log(post);
      setSaved(true);
    } else {
      alert("Title required");
    }
  };

  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(propsPost.content))
      )
    );
    setPost(propsPost);
  }, [propsPost]);

  if (saved === true) {
    return <Redirect to="/" />;
  } else {
    return (
      <form className="container" onSubmit={handlePostForm}>
        <h1>Add new Post</h1>
        <label htmlFor="form-title">Title:</label>
        <br />
        <input
          id="form-title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <p>
          <label htmlFor="form-content">Content:</label>
        </p>
        <div
          style={{
            border: "1px solid black",
            minHeight: "6em",
            cursor: "text",
          }}
          onClick={focusEditor}
        >
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
          />
        </div>
        <p>
          <button type="submit">Save</button>
        </p>
      </form>
    );
  }
};
