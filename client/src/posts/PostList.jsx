import axios from "axios";
import UseScroll from "../lib/UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const PostList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 16;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  const handleViews = async ({ _id }) => {
    console.log(_id);
    const result = await axios.put("http://localhost:8000/post/view", {
      id: _id,
    });
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
      </div>

      <div className="feed-header">
        <h1>{userMessage}</h1>
        <div className="feed-header-group">
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
      <div className="feed-grid">

        {sortedData
          .filter((item) =>
            item.title.toLowerCase().includes(userSearchInput.toLowerCase())
          )
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((element, index) => (

            <div key={index} className="feed-card">
              <Link
                to={`/post/${element._id}`}
                onClick={(e) => handleViews(element)}
              >
                <div className="feed-thumbnail-holder">
                  <div
                    className="feed-thumbnail"
                    style={{
                      backgroundImage: `url("http://localhost:8000/uploads/thumbnail/thumbnail-${element.img}")`,
                    }}
                  ></div>
                </div>
                <div className="feed-text">
                  <h3 className="feed-title">{element.title}</h3>
                  <div className="feed-analitics">
                    <h6>Views: {element.views}</h6>
                    <h6>Likes: {element.likes}</h6>
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
