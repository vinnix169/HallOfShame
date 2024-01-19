
import UseScroll from "./UseScroll";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const PostList = (data) => {
    const itemsPerPage = 16;
    const [currentPage, setCurrentPage] = useState(0);
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //handles the pagination to set the current elements depending on the page number
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        UseScroll('#root', '#pagination', 1000, 'easeOutQuint')
    };

    const sortItem = (e) => {
        let sort = ""
        if(e === undefined) {
          sort = "Likes";
        } else {
          sort = e.target.value
        }
        /*
        switch(sort){
          case "Likes": {
            setData((oldData) => ([...oldData], [...data].sort((a,b) => b.likes - a.likes)))
            break;
          }
          case "Views": {
            setData((oldData) => ([...oldData], [...data].sort((a,b) => b.views - a.views)))
            break;
          }
        }*/
      };
    
      useEffect(() => {
        sortItem()
      },[])

    console.log(data)
    return (
        <>
            <div className="result-grid">
                {data.data.slice(indexOfFirstItem, indexOfLastItem).map((element, index) => (
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
                />
            </div>
        </>
    )
}

export default PostList;