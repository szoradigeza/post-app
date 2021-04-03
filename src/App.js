import "./App.css";

import React, { useState } from "react";
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
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" render={() => <Posts posts={posts} />} />
        <Route
          path="/post/:postSlug"
          render={(props) => {
            const post = posts.find(
              (post) => post.slug === props.match.params.postSlug
            );
            if (post) return <Post post={post} />;
            else return <NotFound />;
          }}
        />
      </div>
    </Router>
  );
};

export default App;
