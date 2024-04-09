

import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/post/tags").then((res) => setData(res.data))
  }, [])

  console.log(data)

  return (
    <main>
      <h1 className="cat-title">All Categories</h1>

      <div className="category-container feed-grid">
        {data && Object.entries(data).map(([tag, img], index) => (
          <div key={index} className="feed-card">
            <div className="feed-text">{tag}</div>
            <div
              className="feed-thumnail-holder"
              style={{
                backgroundImage: `url("http://localhost:8000/uploads/thumbnail/thumbnail-${img}")`
              }}></div>
          </div>
        ))}
      </div>


    </main>
  );
};

export default Categories;
