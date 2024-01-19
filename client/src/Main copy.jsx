import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SmoothScroll from "smooth-scroll"
import UseScroll from "./UseScroll";
import "./Main.css";


const Main = () => {
  //init variables
  const itemsPerPage = 16;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//handles the pagination to set the current elements depending on the page number
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    UseScroll('#root','#pagination', 1000, 'easeOutQuint')
  };


  const sortItem = (e) => {
    let sort = ""
    if(e === undefined) {
      sort = "Likes";
    } else {
      sort = e.target.value
    }
    
    switch(sort){
      case "Likes": {
        setData((oldData) => ([...oldData], [...data].sort((a,b) => b.likes - a.likes)))
        break;
      }
      case "Views": {
        setData((oldData) => ([...oldData], [...data].sort((a,b) => b.views - a.views)))
        break;
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/items", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((items) => {
        setData(items)
        setLoading(false)
        
        console.log("Fetched!");
        console.log("------------------------------------------------------------------------------------------------------------------------")
        
      })
      .catch((error) => console.error(error));
      sortItem()
  }, []);

  useEffect(() => {
    sortItem()
  },[loading])

  
  return (
    <>

      <main>
        <div className="main-container">
          <div className="result-container">
            <div className="result-pagination">
              <div className="sort-element">
                <select defaultValue="AlphabeticAsc" name="sorting" id="sorting" onChange={sortItem}>
                  <option value="Likes">Most Liked</option>
                  <option value="Views">Most Viewed</option>
                  <option value="New">Recent (wip)</option>
                  <option value="Oldest">Oldest (wip)</option>
                </select>
              </div>
            </div>
            <div className="result-grid">
              {loading ? ("Loading...") : (
                
                data.slice(indexOfFirstItem,indexOfLastItem).map((element, index) => (
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
                      <h6>Views: {element.views}</h6>
                      <div className="result-analitics-container">
                        <div>Likes: {element.likes}</div>
                        <div>Added: {element.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
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
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
