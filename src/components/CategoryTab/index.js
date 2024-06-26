import "./CategoryTab.css";
import Text from "../Text";
import { closedFile, closedDropdown, openedFile, openedDropdown } from "../../icons";
import { useState, useContext, useEffect } from "react";
import CategoryContext from "../../store/category-context";

const CategoryTab = ({ category, count, ctx: catContext }) => {
  const [current, setCurrent] = useState(false);
  const ctx = useContext(CategoryContext);

  // set state on which category is clicked
  useEffect(() => {
    if (catContext === category.id) {
      setCurrent(true);
    } else {
      setCurrent(false);
    }
  }, [catContext, category.id]);

  //change category value on context
  const handleClick = () => {
    ctx.setCategory(category.id);
  };
  return (
    <div
      className={`categoryWrapper ${!!current ? "current" : ""}`}
      onClick={handleClick}
      tabIndex={0}
    >
      {!!current ? (
        <>
          <div>
            <img src={openedFile} alt="" />
            <Text sh1>
              {category.title} {`(${count})`}
            </Text>
          </div>
          <img src={openedDropdown} alt="" />
        </>
      ) : (
        <>
          <div>
            <img src={closedFile} alt="" />
            <Text sh1>
              {category.title} {`(${count})`}
            </Text>
          </div>
          <img src={closedDropdown} alt="" />
        </>
      )}
    </div>
  );
};

export default CategoryTab;
