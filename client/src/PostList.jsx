import UseScroll from "./UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Header from "./Header";

const PostList = (data) => {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedData, setSortedData] = useState([]);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [userMessage, setUserMessage] = useState("");

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    UseScroll("#root", "#pagination", 1000, "easeOutQuint");
  };

  const sortItem = (e) => {
    let sort = e ? e.target.value : "Views";
    console.log("Data after sorting");
    switch (sort) {
      case "Likes": {
        setUserMessage("The most liked posts:");
        setSortedData((prev) => [...prev].sort((a, b) => b.likes - a.likes));
        break;
      }
      case "Views": {
        setUserMessage("The most viewed posts:");
        setSortedData((prev) => [...prev].sort((a, b) => b.views - a.views));
        break;
      }
      default: {
        setSortedData((prev) => [...prev]);
      }
    }
  };

  useEffect(() => {
    setSortedData((prev) => [...data.data]);
    sortItem();
  }, []);

  console.log("data before return");
  console.log(sortedData);

  return (
    <>
      <div className="result-pagination">
        <div className="sort-element">
          <div>{userMessage}</div>
          <div className="sort-pagination">
            <select
              defaultValue="Views"
              name="sorting"
              id="sorting"
              onChange={sortItem}
            >
              <option value="Views">Most Viewed</option>
              <option value="Likes">Most Liked</option>
              <option value="New">Recent (wip)</option>
              <option value="Oldest">Oldest (wip)</option>
            </select>
            <ReactPaginate
              id="pagination"
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              nextLabel={">"}
              onPageChange={handlePageClick}
              pageCount={Math.ceil(data.data.length / itemsPerPage)}
              pageClassName={"item pagination-page "}
              pageRangeDisplayed={2}
              previousClassName={"item previous"}
              previousLabel={"<"}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
      <div className="result-grid">
        {sortedData
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((element, index) => (
            <div key={index} className="result-grid-element">
              <Link to={`/post/${element.id}`}>
                <div className="result-element-container">
                  <div
                    className="result-img"
                    style={{
                      backgroundImage: `url("${element.imagePath}")`,
                    }}
                  ></div>
                  <div className="result-text">
                    <div className="result-title">{element.name}</div>
                    <h6>Views: {element.views}</h6>
                    <div className="result-analitics-container">
                      <div>Likes: {element.likes}</div>
                      <div>Added: {element.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="result-pagination">
        <ReactPaginate
          id="pagination"
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel={">"}
          onPageChange={handlePageClick}
          pageCount={Math.ceil(data.data.length / itemsPerPage)}
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
          previousLabel={"<"}
          forcePage={currentPage}
        />
      </div>
    </>
  );
};

export default PostList;
