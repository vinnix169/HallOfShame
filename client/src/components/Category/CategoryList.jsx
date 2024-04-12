import axios from "axios";
import UseScroll from "../../lib/UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const itemsPerPage = 16;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    UseScroll("#root", "#pagination", 1000, "easeOutQuint");
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  useEffect(() => {
    axios.get("http://localhost:8000/post/tags")
      .then((res) => {
        const newData = Object.keys(res.data).map((key) => ({
          tag: key,
          img: [...res.data[key]]
        }));

        setData(newData);

      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


  return (

    <main>
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
        {data
          .filter((item) =>
            item.tag.toLowerCase().includes(userSearchInput)
          )
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((element, index) => (
            <div key={index} className="feed-card">
              <Link
                to={`/categories/${element.tag}`}

              >
                <div className="feed-thumbnail-holder">
                  <div
                    className="feed-thumbnail"
                    style={{
                      backgroundImage:
                        `url("http://localhost:8000/uploads/thumbnail/thumbnail-${element.img[getRandomInt(element.img.length)]}")`,
                    }}
                  ></div>
                </div>
                <div className="feed-text">
                  <h3 className="feed-title">{element.tag}</h3>
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
    </main>
  );
};

export default CategoryList;
