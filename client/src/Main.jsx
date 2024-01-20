import { useEffect, useState } from "react";

import "./Main.css";
import useFetch from "./useFetch";
import PostList from "./PostList";

const Main = () => {
  //init variables
  const { data, pending, error } = useFetch("http://localhost:8000/items");

  return (
    <main>
      {pending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="main-container">
        <div className="result-container">
          {data && <PostList data={data} />}
        </div>
      </div>
    </main>
  );
};

export default Main;
