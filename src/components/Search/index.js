import { useRef } from "react";
import { searchIcon } from "../../icons";
import "./Search.css";

const Search = ({ search }) => {
  const searchInput = useRef();
  //pass input to parent as props
  const handleInput = () => {
    search(searchInput.current.value.toLowerCase());
  };
  return (
    <div className="searchWrapper">
      <img src={searchIcon} alt="search"/>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={handleInput}
        ref={searchInput}
      />
    </div>
  );
};

export default Search;
