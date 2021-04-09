import "./App.css";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Posts } from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import { PostForm } from "./components/PostForm";
import Message from "./components/Message";

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: "hello-react",
      title: "Hello React",
      content: "Lorem",
    },
    {
      id: 2,
      slug: "hello-project",
      title: "Hello project",
      content: "Tothe",
    },
    {
      id: 3,
      slug: "hello-blog",
      title: "Hello blog",
      content: "Ipsum",
    },
  ]);
  const [message, setMessage] = useState(null);

  const getNewSlugFromTitle = (title) => {
    return encodeURIComponent(title.toLowerCase().split(" ").join("-"));
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts([...posts, post]);
    setFlashMessage("saved");
  };

  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index));
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);
    setPosts(updatePost);
    setFlashMessage("updated");
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <Router>
      <div className="App">
        {message && <Message type={message} />}
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Posts posts={posts} />} />
          <Route
            path="/post/:postSlug"
            render={(props) => {
              const post = posts.find((post) => {
                return post.slug === props.match.params.postSlug;
              });
              if (post) return <Post post={post} />;
              else return <NotFound />;
            }}
          />
          <Route
            exact
            path="/new"
            render={() => (
              <PostForm
                post={{ id: 0, slug: "", title: "", content: "" }}
                addNewPost={addNewPost}
              />
            )}
          />
          <Route
            path="/edit/:postSlug"
            render={(props) => {
              const post = posts.find(
                (post) => post.slug === props.match.params.postSlug
              );
              if (post) {
                return <PostForm post={post} updatePost={updatePost} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
