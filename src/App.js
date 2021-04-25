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
import { useStorageState } from "react-storage-hooks";
import Login from "./components/Login";
import UserContext from "./context/UserContext";
import firebase from "./firebase";

const App = () => {
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useStorageState(localStorage, `state-user`, []);
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
    console.log(post);
    post.slug = getNewSlugFromTitle(post.title);

    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);

    setPosts(updatedPosts);
    setFlashMessage("updated");
  };
  const deletePost = (post) => {
    if (window.confirm("Delete this post?")) {
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      setPosts(updatedPosts);
      setFlashMessage("deleted");
    }
  };

  const onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
        console.log("logged in");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({ isAuthenticated: false });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      <Router>
        <div className="App">
          {message && <Message type={message} />}
          <Header />
          <Switch>
            <Route
              exact
              path="/login"
              render={() =>
                !user.isAuthenticated ? <Login /> : <Redirect to="/" />
              }
            />
            <Route exact path="/" render={() => <Posts posts={posts} />} />
            <Route
              path="/post/:postSlug"
              render={(props) => {
                const post = posts.find((post) => {
                  return post.slug === props.match.params.postSlug;
                });
                if (post) return <Post post={post} deletePost={deletePost} />;
                else return <NotFound />;
              }}
            />
            <Route
              exact
              path="/new"
              render={() =>
                user.isAuthenticated ? (
                  <PostForm
                    post={{ id: 0, slug: "", title: "", content: "" }}
                    addNewPost={addNewPost}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/edit/:postSlug"
              render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) {
                  if (user.isAuthenticated) {
                    return <PostForm updatePost={updatePost} post={post} />;
                  } else {
                    return <Redirect to="/login" />;
                  }
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
