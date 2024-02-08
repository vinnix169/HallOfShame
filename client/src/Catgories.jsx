import "./Categories.css";
import useFetch from "./useFetch";
import { useState } from "react";

const Categories = () => {
  const { data, pending, err } = useFetch("http://localhost:8000/post/get");
  const [choose, useChoose] = useState("");

  const handleChoose = () => {};

  return (
    <main>
      <h1 className="cat-title">All Categories</h1>
      {!choose && (
        <div className="category-container">
          <div>
            <h4>Kevin</h4>
          </div>
          <div>
            <h4>Kristóf</h4>
          </div>
          <div>
            <h4>Bálint</h4>
          </div>
          <div>
            <h4>Erik</h4>
          </div>
          <div>
            <h4>Előd</h4>
          </div>
          <div>
            <h4>Psenák</h4>
          </div>
        </div>
      )}
      {choose && <div></div>}
    </main>
  );
};

export default Categories;
