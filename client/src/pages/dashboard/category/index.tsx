import { IconEdit, IconTrash } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { useGetCategory } from "../../../store/server/category/queries";
import {
  useCreateCategory,
  useDeleteCategory,
} from "../../../store/server/category/mutation";
import UpdateCategory from "./components/updateCategory";
import ConfirmModal from "../../../components/confirmmodal";
import Loader from "../../../components/loader";

const Category = () => {
  const [name, setName] = useState("");
  const { data, isLoading } = useGetCategory();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory.mutate(name);
    setName("");
  };

  const handleUpdate = (id: string) => {
    (
      document.getElementById(`update-category${id}`) as HTMLDialogElement
    ).showModal();
  };

  const handleDelete = (id: string) => {
    (
      document.getElementById(`delete-modal${id}`) as HTMLDialogElement
    ).showModal();
  };

  if (isLoading) <Loader />;

  return (
    <div className="my-5 text-center">
      <form action="" onSubmit={handleSubmit}>
        <div className=" join">
          <input
            type="text"
            className=" input input-secondary join-item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="create your category!"
          />
          <button className=" btn btn-secondary join-item" type="submit">
            Submit
          </button>
        </div>
      </form>
      <table className="table mx-auto w-60">
        <thead>
          <tr className=" font-bold text-xl  text-primary">
            <th>Name</th>
            <th className=" text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((category) => (
            <tr className="bg-base-200 rounded-md" key={category._id}>
              <td className=" text-primary">{category.name}</td>
              <td>
                <div className=" flex  items-center gap-5">
                  <IconEdit
                    className="cursor-pointer text-success"
                    onClick={() => handleUpdate(category._id)}
                  />
                  <UpdateCategory value={category} />

                  <IconTrash
                    className="cursor-pointer text-error"
                    onClick={() => handleDelete(category._id)}
                  />
                  <ConfirmModal
                    modalid={`delete-modal${category._id}`}
                    onConfirm={() => deleteCategory.mutate(category)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
