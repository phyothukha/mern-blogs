import { Dispatch, FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillReactProps {
  setBody: Dispatch<React.SetStateAction<string>>;
  body: string;
}

const LiteQuill: FC<QuillReactProps> = ({ setBody, body }) => {
  const modules = { toolbar: { container } };

  return (
    <div>
      <ReactQuill
        modules={modules}
        value={body}
        onChange={(e) => setBody(e)}
        placeholder=" write Something..."
      />
    </div>
  );
};

/*go to https://quilljs.com/docs/modules/toolbar & https://www.npmjs.com/package/react-quill*/
const container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default LiteQuill;
