import { useEffect, useState } from "react";


import "./Main.css";
import useFetch from "./useFetch";
import PostList from "./PostList";


const Main = () => {
  //init variables
  const {data,pending,error} = useFetch("http://localhost:8000/items")
  


  /*
*/
  return (
      <main>
        <div className="main-container">
          <div className="result-container">
            <div className="result-pagination">
              <div className="sort-element">
                <select defaultValue="AlphabeticAsc" name="sorting" id="sorting" onChange={/*sortItem*/""}>
                  <option value="Likes">Most Liked</option>
                  <option value="Views">Most Viewed</option>
                  <option value="New">Recent (wip)</option>
                  <option value="Oldest">Oldest (wip)</option>
                </select>
              </div>
            </div>
            {error && <div>{error}</div>}
            {pending && <div>Loading...</div>}
            {data && <PostList data={data}/>}
          </div>
        </div>
      </main>
  );
};

export default Main;
