import Text from "../Text";
import "./BriefNote.css";

const BriefNote = ({ note, clicked }) => {
  const handleClick = () => clicked?.(note.id);
  return (
    <div className="briefNoteWrapper" onClick={handleClick}>
      <Text h1 bold>
        {note.title}
      </Text>
      <Text sh1>{note.body}</Text>
    </div>
  );
};

export default BriefNote;
