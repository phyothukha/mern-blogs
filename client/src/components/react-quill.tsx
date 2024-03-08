import { Dispatch, FC, useCallback, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAlertSlice } from "../store/client/alertslice";
import { checkImage, uploadImage } from "../utils/imageupload";

interface QuillReactProps {
  setBody: Dispatch<React.SetStateAction<string>>;
  text: string;
}

const Quill: FC<QuillReactProps> = ({ setBody, text }) => {
  const container = [
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],

    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["link", "image", "video"],
  ];
  const modules = { toolbar: { container } };
  const { setAlert } = useAlertSlice();

  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (e: string) => {
    setBody(e);
  };

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const files = input.files;
      if (!files) return setAlert("file does not exist", "ERROR");
      const check = checkImage(files[0]);
      if (check) {
        setAlert(check, "ERROR");
      } else {
        uploadImage(files[0]).then((imgRes) => {
          const quill = quillRef.current;
          const range = quill?.getEditor().getSelection()?.index;
          if (range !== undefined) {
            quill
              ?.getEditor()
              .insertEmbed(range, "image", `${imgRes.secureUrl}`);
          }
        });
      }
    };
  }, [setAlert]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    const toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        ref={quillRef}
        onChange={handleChange}
        placeholder=" write Something..."
      />
      <small className=" block text-end">{text.length}</small>
    </div>
  );
};

export default Quill;
