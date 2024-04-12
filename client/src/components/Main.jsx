import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../lib/AuthContext";
import PostList from "./Post/PostList";
import axios from "axios";
import CategoryList from "./Category/CategoryList";

const Main = () => {

  const [posts, setPosts] = useState(null);


  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getCustomers() {

    await getLoggedIn();

    try {

      const postsRes = await axios.get("http://localhost:8000/post/");
      setPosts(postsRes.data);

    } catch (err) {

      console.warn("You need to be logged in, to proceed: " + err);
      return navigate("/login");

    }

    navigate("/");
  }

  useEffect(() => {
    getCustomers();
  }, []);



  return (
    <main>
      {!posts && loggedIn && < div className="loading">Loading...</div>}
      {posts && <PostList data={posts} />}
    </main >
  );
};

export default Main;
