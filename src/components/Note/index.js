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
  const [note, setNote] = useState({});

  const handleInput = ({ field, value }) => {
    setNote((state) => ({ ...state, [field]: value }));
  };

  const handleCreate = () => {
    dispatch(notesActions.addNote(note));
    actionFinished(false);
  };
  const handleUpdate = () => {
    const editingNoteID = updatingNote.id;
    dispatch(notesActions.editNote({ editingNoteID, note }));
    actionFinished(false);
  };
  const handleDelete = () => {
    dispatch(notesActions.deleteNote(updatingNote.id));
    actionFinished(false);
  };

  useEffect(() => {
    setNote({ id: sNotes.length + 1 });
    if (ctx.category === "") {
      setNote((state) => ({ ...state, category: "0" }));
    } else {
      setNote((state) => ({ ...state, category: ctx.category }));
    }
  }, []);
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
          <Button green icon={tick} onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      ) : (
        <Button green icon={tick} onClick={handleCreate}>
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default Note;
