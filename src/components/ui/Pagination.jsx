import React, {useState} from 'react';

const Pagination = ({ totalItems, itemsPerPage , onPageChange }) =>{
    const totalPages = Math.ceil(totalItems/itemsPerPage);
    const [currentPage , setCurrentPage] = useState(1);

    const handlePageChange = (page) =>{
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <div>
            <ul className='pagination'>
                {[...Array(totalPages)].map((_,index)=>{
                    <li key={index} className={`page-item ${currentPage === index+1 ? 'active':''}`}>
                    <button className='page-link' onClick={()=>handlePageChange(index+1)}>
                        {index+1}
                    </button>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default Pagination;