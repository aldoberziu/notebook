import "./CategoryTab.css";
import Text from "../Text";
import { closedFile, closedDropdown, openedFile, openedDropdown } from "../../icons";
import { useState, useContext, useEffect } from "react";
import CategoryContext from "../../store/category-context";

const CategoryTab = ({ category, count, ctx: catContext }) => {
  const [current, setCurrent] = useState(false);
  const ctx = useContext(CategoryContext);

  useEffect(() => {
    if (catContext === category.id) {
      setCurrent(true);
    } else {
      setCurrent(false);
    }
  }, [catContext]);

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
            <img src={openedFile} />
            <Text sh1>
              {category.title} {`(${count})`}
            </Text>
          </div>
          <img src={openedDropdown} />
        </>
      ) : (
        <>
          <div>
            <img src={closedFile} />
            <Text sh1>
              {category.title} {`(${count})`}
            </Text>
          </div>
          <img src={closedDropdown} />
        </>
      )}
    </div>
  );
};

export default CategoryTab;
