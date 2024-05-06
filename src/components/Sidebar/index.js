import "./Sidebar.css";
import CategoryTab from "../CategoryTab";
import CategoryContext from "../../store/category-context";
import { notes, categories } from "../../Constants";
import { useContext, useState } from "react";
import Button from "../Button";
import { add, cross, tick } from "../../icons";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { categoriesActions } from "../../store/store";

const Sidebar = ({ hideCategories }) => {
  const ctx = useContext(CategoryContext);
  const sNotes = useSelector((state) => state.notes.notes); //redux state notes
  const sCategories = useSelector((state) => state.categories.categories); //redux state categories
  const [createCategory, setCreateCategory] = useState(false); //state to collapse/expand the dropdown
  const [category, setCategory] = useState({});
  const [isClickable, setIsClickable] = useState(false); //state to make button (un)clickable
  const dispatch = useDispatch();

  const handleInput = (input) => {
    setCategory({ id: sCategories.length + 1, title: input.value });
    if (!isClickable) setIsClickable(true);
  };
  const expandInput = () => setCreateCategory(true);
  const collapseInput = () => {
    setCreateCategory(false);
    setIsClickable(false);
  };
  const handleCategoryCreation = () => {
    dispatch(categoriesActions.addCategory(category));
    setCreateCategory(false);
    setIsClickable(false);
  };
  return (
    <div className="sidebarWrapper wrapper">
      <div className="categoryButtons">
        <Button green icon={add} onClick={expandInput}>
          create category
        </Button>
      </div>
      {createCategory && (
        <div className="createCategory">
          <Input type="text" name="category" placeholder="Add a title..." input={handleInput} />
          <Button
            green
            disabled={!isClickable ? true : false}
            icon={tick}
            onClick={handleCategoryCreation}
          ></Button>
          <Button red icon={cross} onClick={collapseInput}></Button>
        </div>
      )}
      <div className={`categories ${!!hideCategories ? "hideCategories" : ""}`}>
        {/* if redux fails or is late, display categories from Constants.js on first render */}
        {(sCategories.length > 0 ? sCategories : categories).map((category) => {
          const filteredNotes = (sNotes.length > 0 ? sNotes : notes).filter(
            (note) => note.category === category.id
          );
          return (
            <CategoryTab
              key={category.id}
              category={category}
              count={filteredNotes.length}
              ctx={ctx.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
