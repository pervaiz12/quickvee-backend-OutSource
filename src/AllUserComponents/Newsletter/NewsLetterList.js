import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsLetterListData } from "../../Redux/features/NewsLetter/NewsLetterSlice";

const NewsLetterList = (props) => {
    const dispatch = useDispatch();
    const [allNewsData, setAllNewsData] = useState([]);
    const AllNewsDataState = useSelector((state) => state.NewsLetterList);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchNewsLetterListData());
    }, [dispatch]);

    useEffect(() => {
        if (!AllNewsDataState.loading && AllNewsDataState.NewsLetterListData) {
            setAllNewsData(AllNewsDataState.NewsLetterListData);
        } else {
            setAllNewsData([]);
        }
    }, [AllNewsDataState.loading, AllNewsDataState.NewsLetterListData]);

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allNewsData.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = () => {
        return currentItems.map((NewsData, index) => (
            <div key={index} className="q-category-bottom-categories-listing">
                <div className="q-category-bottom-categories-single-category">
                    <p className="report-title">{NewsData.id}</p>
                    <p className="report-title">{NewsData.email}</p>
                </div>
            </div>
        ));
    };

    // Logic for page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">ID</p>
                <p className="report-sort">Email</p>
            </div>

            {renderItems()}

            {/* Pagination controls */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(allNewsData.length / itemsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

export default NewsLetterList;
