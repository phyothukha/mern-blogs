import { FC, useState } from "react";
import { useUpdateCategory } from "../../../../store/server/category/mutation";
import { ICategory } from "../../../../store/server/interface";

interface UpdateProps {
  value: ICategory;
}

const UpdateCategory: FC<UpdateProps> = ({ value }) => {
  const [name, setName] = useState(value.name);
  const updateCategory = useUpdateCategory();

  const handleSubmit = () => {
    console.log({ name });
    updateCategory.mutate({ ...value, name });
  };

  return (
    <dialog id={`update-category${value._id}`} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Category</h3>
        <div className="modal-action">
          <form method="dialog" className=" w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" input input-primary w-full my-4"
              placeholder=" text to do list..."
            />
            <button className="btn w-full" type="submit">
              submit
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateCategory;
