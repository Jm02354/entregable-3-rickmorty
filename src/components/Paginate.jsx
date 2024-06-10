import React from "react";
import "./styles/paginate.css";

const Paginate = ({ page, setPage, total }) => {
  const handleLess = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePlus = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };
  return (
    <div>
      <button className="btn__prev" onClick={handleLess}>
        Prev
      </button>
      <span>
        {} {page} / {total} {}
      </span>
      <button className="btn__next" onClick={handlePlus}>
        Next
      </button>
    </div>
  );
};

export default Paginate;
