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
  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post]);
    setFlashMessage("saved");
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
                console.log(post.slug);
                console.log(props.match.params.postSlug);
                return post.slug === props.match.params.postSlug;
              });
              if (post) return <Post post={post} />;
              else return <NotFound />;
            }}
          />
          <Route
            exact
            path="/new"
            render={() => <PostForm addNewPost={addNewPost} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
