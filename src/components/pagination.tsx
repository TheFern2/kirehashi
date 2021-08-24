import React from "react";
import { range } from "lodash";

const Pagination = (props: {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount === 1) return null;
  const pages = range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === props.currentPage ? "page-item active" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
