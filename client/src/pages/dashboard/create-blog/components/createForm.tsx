import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useGetCategory } from "../../../../store/server/category/queries";
import { checkImage } from "../../../../utils/imageupload";
import { useAlertSlice } from "../../../../store/client/alertslice";
import { Iblog } from "../../../../store/server/interface";

interface CreateFormProps {
  blog: Iblog;
  setBlog: Dispatch<SetStateAction<Iblog>>;
  error: Partial<Iblog>;
}

const CreateForm: FC<CreateFormProps> = ({ blog, setBlog, error }) => {
  const { data: CategoryData } = useGetCategory();
  const { setAlert } = useAlertSlice();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangethumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const check = checkImage(files[0]);
      if (check) {
        setAlert(check, "ERROR");
      } else {
        setBlog({ ...blog, thumbnail: files[0] });
      }
    }
  };

  return (
    <div className=" flex flex-col gap-5 p-5">
      <label htmlFor="blog-title" className=" form-control  w-full ">
        <div className=" label">
          <span className={`label-text ${error.title && " text-error"}`}>
            Title
          </span>
        </div>
        <input
          type="text"
          id="blog-title"
          onChange={handleChange}
          name="title"
          placeholder="Type your name"
          className={`input input-bordered ${
            error.title ? "input-error" : "input-info"
          } w-full max-w-lg`}
        />
        {error.title && <p className=" text-error text-sm">{error.title}</p>}
      </label>
      <label htmlFor="blog-thumbnail" className=" form-control w-full">
        <div className=" label">
          <span className={`label-text ${error.thumbnail && " text-error"}`}>
            Thumbnail
          </span>
        </div>
        <input
          type="file"
          name="thumbnail"
          onChange={handleChangethumbnail}
          id="blog-thumbnail"
          className={`file-input file-input-bordered ${
            error.thumbnail ? "file-input-error" : "file-input-info"
          } w-full max-w-lg`}
        />
        {error.thumbnail && (
          <p className=" text-error text-sm">{error.thumbnail as string}</p>
        )}
      </label>
      <label htmlFor="blog-description" className=" form-control w-full">
        <div className=" label ">
          <span className={`label-text ${error.description && " text-error"}`}>
            Description
          </span>
        </div>
        <textarea
          name="description"
          id="blog-description"
          onChange={handleChange}
          placeholder="type your description!"
          className={` textarea ${
            error.description ? "textarea-error" : "textarea-info"
          } w-full max-w-lg`}
        ></textarea>
        {error.description && (
          <p className=" text-error text-sm">{error.description}</p>
        )}
      </label>

      <label htmlFor="blog-category" className=" form-control w-full">
        <div className=" label">
          <span className={`label-text ${error.category && " text-error"}`}>
            Category
          </span>
        </div>
        <select
          id="blog-category"
          name="category"
          onChange={handleChange}
          className={` select ${
            error.category ? "select-error" : "select-info"
          } w-full max-w-lg`}
          defaultValue={blog.category as string}
        >
          <option disabled selected>
            Select language
          </option>
          {CategoryData?.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
        {error.category && (
          <p className=" text-error text-sm">{error.category as string}</p>
        )}
      </label>
    </div>
  );
};

export default CreateForm;
