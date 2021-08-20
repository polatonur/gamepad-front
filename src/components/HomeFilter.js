import "./homeFilter.css";

const HomeFilter = ({
  setPlatform,
  setSortBy,
  setType,
  setActivePage,
  setSearchButtonTriggered,
  searchButtonTriggered,
}) => {
  return (
    <div className="filter">
      <div className="filter_col_1">
        <span>Platform :</span>
        <select
          onChange={(event) => {
            setPlatform(event.target.value);
          }}
        >
          <option value="0">All</option>
          <option value="1">PC</option>
          <option value="2">PlayStation</option>
          <option value="3">Xbox</option>
          <option value="4">IOS</option>
          <option value="8">Android</option>
          <option value="6">Linux</option>
          <option value="7">Nintendo</option>
          <option value="14">Web</option>
          <option value="5">Apple Macinost</option>
          <option value="9">Atari</option>
        </select>
        <span>Type :</span>
        <select
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <option value="0">All</option>
          <option value="action">Action</option>
          <option value="strategy">Strategy</option>
          <option value="RPG">RPG</option>
          <option value="shooter">Shooter</option>
          <option value="puzzle">Puzzle</option>
          <option value="sports">Sports</option>
          <option value="adventure">Adventure</option>
          <option value="racing">Racing</option>
        </select>
      </div>
      <div className="filter_col_2">
        <span>Sort By :</span>
        <select
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option value="0">All</option>
          <option value="added">Date added ↑</option>
          <option value="-added">Date added ↓</option>
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
          <option value="-rating">Popularity ↓</option>
          <option value="rating">Popularity ↑</option>
          <option value="released">Release date ↑</option>
          <option value="-released">Release date ↓</option>
        </select>
        <button
          onClick={() => {
            setActivePage(1);
            setSearchButtonTriggered(!searchButtonTriggered);
          }}
          className="go_filters_btn"
        >
          Go Filters !
        </button>
      </div>
    </div>
  );
};

export default HomeFilter;
