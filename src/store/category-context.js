import React, { useState } from "react";

const CategoryContext = React.createContext({
  category: "",
  setCategory: (id) => {},
});

export const CategoryContextProvider = (props) => {
  const [cat, setCat] = useState("");

  const categoryHandler = (id) => {
    setCat(id);
  };

  return (
    <CategoryContext.Provider value={{ category: cat, setCategory: categoryHandler }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
