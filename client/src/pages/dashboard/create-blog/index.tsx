import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuthSlice } from "../../../store/client/authslice";
import { validationCreateBlog } from "../../../utils/valid";
import { uploadImage } from "../../../utils/imageupload";
import { useCreateBlog } from "../../../store/server/blog-post/mutation";
import Notfound from "../../notfound";
import CreateForm from "./components/createForm";
import ShowForm from "./components/showForm";
import Quill from "../../../components/react-quill";
import { useAlertSlice } from "../../../store/client/alertslice";
import { Iblog } from "../../../store/server/blog-post/interface";

const CreateBlog = () => {
  const initState = {
    user: "",
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
    createdAt: new Date().toISOString(),
  };
  const [error, setError] = useState<Partial<Iblog>>({});
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Iblog>(initState);
  const [body, setBody] = useState("");
  const [text, setText] = useState("");
  const { setAlert } = useAlertSlice();
  const { auth } = useAuthSlice();
  const divRef = useRef<HTMLDivElement>(null);
  const createBlog = useCreateBlog();

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    setText(div.innerText as string);
  }, [body]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!auth?.access_token) return;
    const validationErr = validationCreateBlog({ ...blog, content: text });
    // console.log(validationErr);

    if (Object.keys(validationErr).length > 0) {
      setError(validationErr);
      setAlert("your data  is required!", "ERROR");
      setLoading(false);
    } else {
      const newData = { ...blog, content: body, user: auth.user?._id };
      if (typeof newData.thumbnail !== "string") {
        const photo = await uploadImage(newData.thumbnail);
        newData.thumbnail = photo.secureUrl;
      }
      // setLoading(false);
      console.log(newData);
      // createBlog.mutate(newData);
    }
  };

  if (!auth?.access_token) return <Notfound />;

  return (
    <form onSubmit={handleSubmit} className=" my-5">
      <div className=" grid  grid-rows-1   md:grid-cols-12 gap-4 my-5">
        <div className=" col-span-6">
          <CreateForm blog={blog} setBlog={setBlog} error={error} />
        </div>
        <div className=" col-span-6">
          <ShowForm blog={blog} />
        </div>
      </div>
      <Quill setBody={setBody} text={text} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />
      <button className=" btn btn-secondary mt-5" type="submit">
        {/* {(loading || createBlog.isPending) && (
          <span className="loading loading-spinner loading-xs"></span>
        )} */}
        Post
      </button>
    </form>
  );
};

export default CreateBlog;
