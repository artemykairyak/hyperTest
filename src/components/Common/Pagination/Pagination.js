import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({currentPage, totalItems, pageSize, portion, setPortion, onPageChanged, portionSize = 5, ...props}) => {
    console.log(currentPage, totalItems, pageSize, portion, setPortion, onPageChanged, portionSize);
    let pagesCount = Math.ceil(totalItems / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const setPortionNumber = (portionNumber) => {
        setPortion(portionNumber);
    };

    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portion - 1) * portionSize + 1;
    let rightPortionPageNumber = portion * portionSize;

    return (
        <div className={styles.pagination}>
            {portion > 1 &&
            <span onClick={() => setPortionNumber(portion - 1)} className={styles.paginationArr}>{'<<'}</span>}
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <span
                        key={page}
                        onClick={() => onPageChanged(page)}
                        className={currentPage === page ? styles.selectedPage : styles.page}>{page}</span>;
                })}
            {portionCount > portion &&
            <span onClick={() => setPortionNumber(portion + 1)} className={styles.paginationArr}>{'>>'}</span>}
        </div>
    )
};

export default Pagination;