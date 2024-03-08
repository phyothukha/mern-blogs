import { FC, useRef, useState } from "react";
import LiteQuill from "../../../../components/lite-quill";

interface INewCommentProps {
  handleComment: (body: string) => void;
  loading?: boolean;
}

const NewComment: FC<INewCommentProps> = ({ handleComment, loading }) => {
  const [body, setBody] = useState("");

  const divRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    const div = divRef.current;
    const text = div?.innerText as string;

    if (!text.trim()) return;
    handleComment(body);
    setBody("");
  };
  return (
    <div className=" my-3">
      <LiteQuill body={body} setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        className=" hidden"
      />
      <button className=" btn btn-primary mt-2" onClick={handleClick}>
        {loading && <span className="loading loading-spinner"></span>}
        Send
      </button>
    </div>
  );
};

export default NewComment;
