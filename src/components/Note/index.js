import { useContext, useEffect, useState } from "react";
import Input from "../Input";
import "./Note.css";
import Button from "../Button";
import { tick, trash } from "../../icons";
import CategoryContext from "../../store/category-context";
import { useSelector, useDispatch } from "react-redux";
import { notesActions } from "../../store/store";

// component to either create new note or update note
const Note = ({ actionFinished, updatingNote }) => {
  const dispatch = useDispatch();
  const ctx = useContext(CategoryContext); //category from context
  const sNotes = useSelector((state) => state.notes.notes); //notes from redux state
  const [storedIDs, setStoredIDs] = useState([]); //ids of notes stored on redux
  const [note, setNote] = useState({});
  const [isClickable, setIsClickable] = useState(false); //state to make button clickable or not

  //handle data from input fields
  const handleInput = ({ field, value }) => {
    setNote((state) => ({ ...state, [field]: value }));
    if (!isClickable) setIsClickable(true);
  };
  //save note on redux on creation
  const handleCreate = () => {
    dispatch(notesActions.addNote(note));
    actionFinished(false);
    setIsClickable(false);
  };
  //update note on redux
  const handleUpdate = () => {
    const editingNoteID = updatingNote.id;
    dispatch(notesActions.editNote({ editingNoteID, note }));
    actionFinished(false);
    setIsClickable(false);
  };
  //delete note from redux
  const handleDelete = () => {
    dispatch(notesActions.deleteNote(updatingNote.id));
    actionFinished(false);
    setIsClickable(false);
  };
  //store all notes' ids in useState (sorted)
  useEffect(() => {
    if (sNotes.length > 0) {
      const ids = sNotes.map((note) => note.id).sort((a, b) => a - b);
      setStoredIDs(ids);
    }
  }, [sNotes]);
  //build a premade note with generated id and general category on each render
  useEffect(() => {
    setNote({ id: generateID() });
    if (ctx.category === "") {
      setNote((state) => ({ ...state, category: "0" }));
    } else {
      setNote((state) => ({ ...state, category: ctx.category }));
    }
  }, [storedIDs]);
  //generate id when creating new note
  const generateID = () => {
    let generatedID = 1;
    for (let id of storedIDs) {
      if (parseInt(id) === generatedID) {
        generatedID++;
      } else {
        break;
      }
    }
    return generatedID.toString();
  };
  return (
    <div className="noteWrapper wrapper">
      <div className="tabs">
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <Input
        type="text"
        name="title"
        value={updatingNote?.title}
        placeholder="Add a title"
        input={handleInput}
      />
      <hr></hr>
      <Input
        type="textarea"
        name="body"
        value={updatingNote?.body}
        placeholder="Write your note here..."
        input={handleInput}
      />

      {updatingNote ? (
        <div className="buttons">
          <Button red icon={trash} onClick={handleDelete}>
            Delete Note
          </Button>
          <Button green disabled={!isClickable ? true : false} icon={tick} onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      ) : (
        <Button green disabled={!isClickable ? true : false} icon={tick} onClick={handleCreate}>
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default Note;
