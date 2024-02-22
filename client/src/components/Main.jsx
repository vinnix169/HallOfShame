import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../lib/AuthContext";

import PostList from "../posts/PostList";
import axios from "axios";
import Login from "../auth/Login";

const Main = () => {
  const [posts, setPosts] = useState(null);
  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  async function getCustomers() {
    if (!loggedIn) {
      return navigate("/login")
    }

    const postsRes = await axios.get("http://localhost:8000/post/");
    setPosts(postsRes.data);

  }


  useEffect(() => {
    getCustomers();

  }, [loggedIn]);

  return (
    <main>
      {!posts && loggedIn && <div className="loading">Loading...</div>}
      {posts && <PostList data={posts} />}
    </main>
  );
};

export default Main;
