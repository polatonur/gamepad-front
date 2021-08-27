import "./pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ count, activePage, setActivePage, perPage }) => {
  let pages = [];
  console.log("pagination count avant====>", count);
  count = Math.ceil(count / perPage);
  console.log(perPage);
  console.log("pagination count apres====>", count);

  console.log();
  if (count === 1) {
    pages = [1];
  } else if (count === 2) {
    pages = [1, 2];
  } else if (activePage === 1) {
    pages = [1, 2, 3];
  } else if (activePage === 2) {
    pages = [1, 2, 3];
  } else if (activePage === count) {
    pages = [count - 2, count - 1, count];
  } else if (activePage === count - 1) {
    pages = [count - 2, count - 1, count];
  } else {
    pages = [activePage - 1, activePage, activePage + 1];
  }
  return (
    <div className="pagination">
      <div className="pages">
        <FontAwesomeIcon
          onClick={() => setActivePage(1)}
          className="icon"
          icon="angle-double-left"
        />
        <FontAwesomeIcon
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="icon"
          icon="angle-left"
        />
        {!(activePage === 1 || activePage === 2) && <span>. . .</span>}
        {pages.map((elem, index) => {
          return (
            <span
              key={elem}
              className={`page-number-square ${
                elem === activePage && "active"
              }`}
            >
              <span
                className={`page-number `}
                onClick={() => setActivePage(elem)}
              >
                {elem}
              </span>
            </span>
          );
        })}
        {!(activePage === count || activePage === count - 1) && (
          <span>. . .</span>
        )}
        <FontAwesomeIcon
          onClick={() => {
            if (activePage < count) {
              setActivePage(activePage + 1);
            }
          }}
          className="icon"
          icon="angle-right"
        />
        <FontAwesomeIcon
          onClick={() => setActivePage(count)}
          className="icon"
          icon="angle-double-right"
        />
      </div>
    </div>
  );
};
export default Pagination;
