import { Dispatch, FC, SetStateAction } from "react";
import ReactQuill from "react-quill";

interface IQuillProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}

const LiteQuill: FC<IQuillProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container } };

  return (
    <div>
      <ReactQuill
        modules={modules}
        placeholder="write something..."
        onChange={(e) => setBody(e)}
        value={body}
      />
    </div>
  );
};

const container = [
  [{ font: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block", "link"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
];

export default LiteQuill;
