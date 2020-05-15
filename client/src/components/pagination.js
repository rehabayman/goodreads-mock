import React from 'react';

function Pagination(props){
    // props.booksPerPage, props.totalBooks;
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(props.totalBooks / props.booksPerPage); i ++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href="#" className="page-link" onClick={()=> props.paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;