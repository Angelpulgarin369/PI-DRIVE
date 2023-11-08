import React from "react";
import style from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={style.container}>
      <div className={style.pages}>
        {pageNumbers.map((page) => (
          <PageNumber
            key={page}
            page={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ))}
      </div>
    </div>
  );
}

function PageNumber({ page, currentPage, onPageChange }) {
  const isCurrent = currentPage === page;
  const isEven = page % 2 === 0;
  const pageNumberClass = isCurrent ? style.active : isEven ? style.alt1 : style.alt;

  return (
    <div
      className={`${style["page-number"]} ${pageNumberClass}`}
      onClick={() => onPageChange(page)}
    >
      {page}
    </div>
  );
}

export default Pagination;
