import { useEffect, useState } from "react";



import PostList from "../posts/PostList";
import axios from "axios";

const Main = () => {

  const [posts, setPosts] = useState(null)
  //init variables
  async function getCustomers() {
    const postsRes = await axios.get("http://localhost:8000/post/");

    setPosts(postsRes.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  console.log(posts)
  return (
    <main>
      {!posts && <div className="loading">Loading...</div>}
      <div className="main-container">
        <div className="result-container">
          {posts && <PostList data={posts} />}
        </div>
      </div>
    </main>
  );
};

export default Main;
