import { useContext, useEffect, useState } from "react";
import Input from "../Input";
import "./Note.css";
import Button from "../Button";
import { tick, trash } from "../../icons";
import CategoryContext from "../../store/category-context";
import { useSelector, useDispatch } from "react-redux";
import { notesActions } from "../../store/store";

const Note = ({ actionFinished, updatingNote }) => {
  const dispatch = useDispatch();
  const ctx = useContext(CategoryContext);
  const sNotes = useSelector((state) => state.notes.notes);
  const [storedIDs, setStoredIDs] = useState([]);
  const [note, setNote] = useState({});
  const [isClickable, setIsClickable] = useState(false);

  const handleInput = ({ field, value }) => {
    setNote((state) => ({ ...state, [field]: value }));
    if (!isClickable) setIsClickable(true);
  };
  const handleCreate = () => {
    dispatch(notesActions.addNote(note));
    actionFinished(false);
    setIsClickable(false);
  };
  const handleUpdate = () => {
    const editingNoteID = updatingNote.id;
    dispatch(notesActions.editNote({ editingNoteID, note }));
    actionFinished(false);
    setIsClickable(false);
  };
  const handleDelete = () => {
    dispatch(notesActions.deleteNote(updatingNote.id));
    actionFinished(false);
    setIsClickable(false);
  };

  useEffect(() => {
    if (sNotes.length > 0) {
      const ids = sNotes.map((note) => note.id).sort((a, b) => a - b);
      setStoredIDs(ids);
    }
  }, [sNotes]);
  useEffect(() => {
    setNote({ id: generateID() });
    if (ctx.category === "") {
      setNote((state) => ({ ...state, category: "0" }));
    } else {
      setNote((state) => ({ ...state, category: ctx.category }));
    }
  }, [storedIDs]);
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
