
import React from 'react'

const Pagination=({ totalItemsCount, itemsCountPerPage, currentActivePage, paginate })=>  {

    const pageNumbers = [];

    for (let i = currentActivePage || 1; i <= Math.ceil(totalItemsCount/itemsCountPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map(num => {
                        return (<li key={num} className="page-item">
                            <a href="!#" className="page-link" onClick={() => paginate(num)}>{num}</a>
                        </li>)
                    })
                }

            </ul>
        </nav>
    );
    
}

export default Pagination