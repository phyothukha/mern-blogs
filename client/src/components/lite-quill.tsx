import { Dispatch, FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillReactProps {
  setBody: Dispatch<React.SetStateAction<string>>;
  body: string;
}

const LiteQuill: FC<QuillReactProps> = ({ setBody, body }) => {
  const container = [
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ align: [] }],
    ["link", "image", "video"],
  ];

  const modules = { toolbar: { container } };

  return (
    <div>
      <ReactQuill
        modules={modules}
        value={body}
        className=" rounded-md"
        onChange={(e) => setBody(e)}
        placeholder=" Write Something..."
      />
    </div>
  );
};

/*go to https://quilljs.com/docs/modules/toolbar & https://www.npmjs.com/package/react-quill*/

export default LiteQuill;
