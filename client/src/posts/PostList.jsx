import UseScroll from "../lib/UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const PostList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 16;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let tempSearch = "";

  const [sortedData, setSortedData] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    UseScroll("#root", "#pagination", 1000, "easeOutQuint");
  };

  const sortItem = (e) => {
    let sort = e ? e.target.value : "New";
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
      case "New": {
        setUserMessage("The most recent posts:");
        setSortedData((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        break;
      }
      case "Oldest": {
        setUserMessage("The oldest posts:");
        setSortedData((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
        break;
      }
      default: {
        setSortedData((prev) => [...prev]);
      }
    }
  };

  useEffect(() => {
    setSortedData((prev) => [...data]);
    sortItem();
  }, []);

  return (
    <>
      <div className="search-element">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setUserSearchInput(e.target.value)}
        />
        <input className="search-btn" type="button" />
      </div>
      <div className="result-pagination">
        <div className="sort-element">
          <h2>{userMessage}</h2>
          <div className="sort-pagination">
            <select
              defaultValue="New"
              name="sorting"
              id="sorting"
              onChange={sortItem}
            >
              <option value="New">Recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Views">Most Viewed</option>
              <option value="Likes">Most Liked</option>
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
              pageCount={Math.ceil(data.length / itemsPerPage)}
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
          .filter((item) =>
            item.title.toLowerCase().includes(userSearchInput.toLowerCase())
          )
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((element, index) => (
            <div key={index} className="result-grid-element">
              <Link to={`/post/${element._id}`}>
                <div className="result-element-container">
                  <div
                    className="result-img"
                    style={{
                      backgroundImage: `url("http://localhost:8000/uploads/${element.img}")`,
                    }}
                  ></div>
                  <div className="result-text">
                    <div className="result-title">{element.title}</div>
                    <h6>Views: {element.views}</h6>
                    <div className="result-analitics-container">
                      <div>Likes: {element.likes}</div>
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
          pageCount={Math.ceil(data.length / itemsPerPage)}
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
