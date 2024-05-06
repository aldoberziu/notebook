import Sidebar from "./components/Sidebar";
import Note from "./components/Note";
import "./App.css";
import CategoryContext from "./store/category-context";
import { useContext, useEffect, useState } from "react";
import BriefNote from "./components/BriefNote";
import { notes, categories } from "./Constants";
import { categoriesActions, notesActions } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./icons";
import Button from "./components/Button";
import Search from "./components/Search";

function App() {
  const dispatch = useDispatch();
  const ctx = useContext(CategoryContext);
  const sNotes = useSelector((state) => state.notes.notes); //redux state notes
  const [currentNotes, setCurrentNotes] = useState([]); //notes displayed by category
  const [search, setSearch] = useState(""); //search string state
  const [actionOnNote, setActionOnNote] = useState(false); //boolean if creating note page opened or not
  const [updatingNote, setUpdatingNote] = useState(false); //boolean if we updating or not
  const [hideCatMobile, setHideCatMobile] = useState(false); //boolean hide/show categories of sidebar on mobile
  const [clickedNote, setClickedNote] = useState({}); //pass clicked BriefNote as prop to child

  //save notes and categories in redux state
  useEffect(() => {
    dispatch(notesActions.addNotes(notes));
    dispatch(categoriesActions.addCategories(categories));
  }, []);

  const handleCreate = () => setActionOnNote(true);
  const handleFinish = (value) => setActionOnNote(value);
  const handleUpdateFinish = (value) => {
    setUpdatingNote(value);
    setHideCatMobile(false);
  };
  const handleClicked = (id) => {
    setClickedNote(currentNotes.filter((note) => note.id === id));
    setUpdatingNote(true);
    setHideCatMobile(true);
  };
  //change clickedNote state on context's category change
  useEffect(() => {
    setClickedNote([]);
  }, [ctx.category]);
  //filter notes when needed either by category click or search input
  useEffect(() => {
    let filteredNotes = [];
    filteredNotes = (sNotes.length > 0 ? sNotes : notes).filter(
      (note) => note.category === ctx.category
    );
    if (search !== "") {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title?.toLowerCase().includes(search) ||
          note.body?.toLowerCase().includes(search)
      );
    }
    setCurrentNotes(filteredNotes);
  }, [ctx.category, search, sNotes]);

  const handleSearch = (value) => setSearch(value);

  return (
    <div className="appWrapper">
      <Sidebar hideCategories={hideCatMobile} />
      {/* display create note component on first render */}
      {ctx.category === "" || !!actionOnNote ? (
        <Note actionFinished={handleFinish} />
      ) : (
        // what to display if a category is clicked
        <div className={`notesWrapper ${!!updatingNote ? "updatingNote" : ""}`}>
          <div className="catNotesWrapper wrapper">
            <div className="briefNotesEvents">
              <Button green icon={add} onClick={handleCreate}>
                create Note
              </Button>
              <Search search={handleSearch} />
            </div>
            <div className="briefNotesWrapper">
              {/* notes displayed filtered by category clicked */}
              {currentNotes.map((note) => (
                <BriefNote key={note.id} note={note} clicked={handleClicked} />
              ))}
            </div>
          </div>
          {/* brief note clicked so display update note component */}
          {clickedNote?.length !== 0 && !!updatingNote ? (
            <Note actionFinished={handleUpdateFinish} updatingNote={clickedNote[0]} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
