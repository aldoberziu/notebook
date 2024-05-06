import { useEffect, useState } from "react";
import { searchIcon } from "../../icons";
import "./Search.css";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleInput = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };
  useEffect(() => {
    search(searchValue);
  }, [searchValue]);
  return (
    <div className="searchWrapper">
      <img src={searchIcon} />
      <input type="text" name="search" placeholder="Search..." onChange={handleInput} />
    </div>
  );
};

export default Search;
