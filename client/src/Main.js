import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import leftBtn from "./img/round-left-button-svgrepo-com.svg";

const Main = () => {
  const itemsPerPage = 16;
  const [data, setData] = useState({ items: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  let newData = { items: [] };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    document.body.screenTop = 0;
    document.documentElement.scrollTop = 0;
    setCurrentItems(newData.items.slice(indexOfFirstItem, indexOfLastItem));
  };

  useEffect(() => {
    fetch("http://localhost:8000/items", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((items) => {
        newData.items.push(items);
        console.log("Fetched:");
        console.log(items);
      })
      .catch((error) => console.error(error));
  }, []);
  const sortItem = () => {};
  console.log("newData:");
  console.log(newData);
  return (
    <>
      <main>
        <div className="main-container">
          <div className="result-container">
            <div className="result-pagination">
              <div className="sort-element">
                <label htmlFor="sort">Sort:</label>
                <select name="sorting" id="sorting" onChange={sortItem}>
                  <option value="DescLikes">Most Liked</option>
                  <option value="DescViews">Most Viewed</option>
                  <option value="AlphabeticDesc">Alphabetical desc.</option>
                  <option value="AlphabeticAsc">Alphabetical asc.</option>
                </select>
              </div>
            </div>
            <div className="result-grid">
              {currentItems.map((element, index) => (
                <div key={index} className="result-grid-element">
                  <div className="result-element-container">
                    <div
                      className="result-img"
                      style={{
                        backgroundImage: `url("${element.imagePath}")`,
                      }}
                    ></div>
                    <div className="result-text">
                      <div className="result-title">{element.name}</div>
                      <div className="result-analitics-container">
                        <div>Likes: {element.likes}</div>
                        <div>Added: {element.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="result-pagination">
              <ReactPaginate
                activeClassName={"item active "}
                breakClassName={"item break-me "}
                breakLabel={"..."}
                containerClassName={"pagination"}
                disabledClassName={"disabled-page"}
                marginPagesDisplayed={2}
                nextClassName={"item next "}
                nextLabel={">"}
                onPageChange={handlePageClick}
                pageCount={Math.ceil(data.items.length / itemsPerPage)}
                pageClassName={"item pagination-page "}
                pageRangeDisplayed={2}
                previousClassName={"item previous"}
                previousLabel={"<"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
