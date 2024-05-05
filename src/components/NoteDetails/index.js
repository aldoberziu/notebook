import Text from "../Text";

const NoteDetails = ({ note }) => {
  if (note !== undefined) {
    return (
      <div className="detailedNoteWrapper wrapper">
        <Text>{note.id}</Text>
        <Text>{note.title}</Text>
        <Text>{note.body}</Text>
        <Text>{note.category}</Text>
      </div>
    );
  } else return <></>;
};

export default NoteDetails;
