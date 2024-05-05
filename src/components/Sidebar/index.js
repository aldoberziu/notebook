import "./Sidebar.css";
import CategoryTab from "../CategoryTab";
import CategoryContext from "../../store/category-context";
import { notes, categories } from "../../Constants";
import { useContext, useState } from "react";
import Button from "../Button";
import { add, cross, tick } from "../../icons";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { categoriesActions, notesActions } from "../../store/store";

const Sidebar = ({ hideCategories }) => {
  const ctx = useContext(CategoryContext);
  const sNotes = useSelector((state) => state.notes.notes);
  const sCategories = useSelector((state) => state.categories.categories);
  const [createCategory, setCreateCategory] = useState(false);
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();

  //still not perfect
  // const generateID = () => {
  //   let id = 1;
  //   for (let cat of categories) {
  //     if (cat.id === id) {
  //       id++;
  //     } else {
  //       break;
  //     }
  //   }
  //   return id;
  // };
  const handleInput = (input) => {
    setCategory({ id: /*generateID()*/ sCategories.length + 1, title: input.value });
  };
  const expandInput = () => setCreateCategory(true);
  const collapseInput = () => setCreateCategory(false);
  const handleCategoryCreation = () => {
    dispatch(categoriesActions.addCategory(category));
    setCreateCategory(false);
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
          <Button green icon={tick} onClick={handleCategoryCreation}></Button>
          <Button red icon={cross} onClick={collapseInput}></Button>
        </div>
      )}
      <div className={`categories ${!!hideCategories ? "hideCategories" : ""}`}>
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
