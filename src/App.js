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

function App() {
  const dispatch = useDispatch();
  const ctx = useContext(CategoryContext);
  const sNotes = useSelector((state) => state.notes.notes);
  const [actionOnNote, setActionOnNote] = useState(false);
  const [updatingNote, setUpdatingNote] = useState(false);
  const [hideCatMobile, setHideCatMobile] = useState(false);
  const [clickedNote, setClickedNote] = useState({});

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
  useEffect(() => {
    setClickedNote([]);
  }, [ctx.category]);

  const currentNotes = (sNotes.length > 0 ? sNotes : notes).filter(
    (note) => note.category === ctx.category
  );

  return (
    <div className="appWrapper">
      <Sidebar hideCategories={hideCatMobile}/>
      {ctx.category === "" || !!actionOnNote ? (
        <Note actionFinished={handleFinish} />
      ) : (
        <div className={`notesWrapper ${!!updatingNote ? "updatingNote" : ""}`}>
          <div className="catNotesWrapper wrapper">
            <Button green icon={add} onClick={handleCreate}>
              create Note
            </Button>
            <div className="briefNotesWrapper">
              {currentNotes.map((note) => (
                <BriefNote key={note.id} note={note} clicked={handleClicked} />
              ))}
            </div>
          </div>
          {clickedNote?.length !== 0 && !!updatingNote ? (
            <Note actionFinished={handleUpdateFinish} updatingNote={clickedNote[0]} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default App;
