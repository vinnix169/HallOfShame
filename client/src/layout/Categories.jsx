

import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/post/tags").then((res) => setData(res.data))
  }, [])

  return (
    <main>
      <h1 className="cat-title">All Categories</h1>

      <div className="category-container feed-grid">
        {data && data.map((i, index) => (
          <div key={index} className="feed-card">
            {i}
          </div>
        ))}
      </div>


    </main>
  );
};

export default Categories;
