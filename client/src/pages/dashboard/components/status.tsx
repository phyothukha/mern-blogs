import { useState } from "react";
import useTodoStore from "../../../store/test/store";

interface statusprops {
  title: string;
}

const Status = ({ title }: statusprops) => {
  const [text, setText] = useState("");
  const [drop, setdrop] = useState(false);

  const tasks = useTodoStore((store) =>
    store.tasks.filter((t) => t.status === title)
  );
  const addTasks = useTodoStore((store) => store.addTasks);

  const deletetasks = useTodoStore((store) => store.deleteTasks);
  const dragedTask = useTodoStore((store) => store.dragedTasks);
  const setDragTasks = useTodoStore((store) => store.setDraggedTask);
  const moveTasks = useTodoStore((store) => store.moveTasks);

  return (
    <div
      onDragOver={(e) => {
        setdrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setdrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setdrop(false);

        if (dragedTask && dragedTask.status !== title) {
          moveTasks(dragedTask.id, { ...dragedTask, status: title });
        }
      }}
      className={`mt-5 ${
        drop ? " bg-success" : "bg-secondary"
      } flex flex-col justify-center 
      transform transition-all  duration-500
      items-center w-56 rounded-md 
       `}
    >
      <div className=" flex justify-between items-center w-full p-2">
        <button
          className=" btn btn-outline btn-sm "
          onClick={() =>
            (document.getElementById(title) as HTMLDialogElement)?.showModal()
          }
        >
          Add
        </button>

        <dialog id={title} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">To Do List!</h3>

            <div className="modal-action">
              <form
                method="dialog"
                onSubmit={() => {
                  if (text.length > 1) {
                    addTasks({ id: Date.now(), text, status: title });
                  }
                  setText("");
                }}
                className=" w-full"
              >
                <input
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
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
      </div>

      {tasks.map(({ id, text, status }) => {
        return (
          <div
            key={id}
            draggable
            className={`inline-block   cursor-move transition-opacity h-32 rounded-md my-3  w-52 p-2 bg-primary align-bottom `}
            onDragStart={() => setDragTasks({ id, text, status })}
          >
            <p
              className=" btn btn-error btn-xs"
              onClick={() => deletetasks(id)}
            >
              Del
            </p>
            <p>{text}</p>
            <p
              className={` badge ${
                status === "ONGOING"
                  ? "badge-warning"
                  : status === "DONE"
                  ? "badge-neutral"
                  : "badge-accent"
              } p-2`}
            >
              {status}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Status;
