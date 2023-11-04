import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

interface taskType {
  id: number;
  text: string;
  status: string;
}

interface Todostate {
  tasks: taskType[];
  addTasks: (payload: taskType) => void;
  deleteTasks: (id: number) => void;
  dragedTasks: taskType | null;
  setDraggedTask: (payoad: taskType) => void;
  moveTasks: (id: number, payload: taskType) => void;
}

// const useTodoStore = create<Todostate>()(
//   devtools(
//     persist(
//       (set) => ({
//         tasks: [],
//         addTasks: (id, ...payload) =>
//           set((store) => ({
//             tasks: [...store.tasks, { id: store.tasks.length + 1, ...payload }],
//           })),
//         deleteTasks: (text) =>
//           set((store) => ({
//             tasks: store.tasks.filter((t) => t.text !== text),
//           })),
//         draggedTasks: null,
//         setDraggedTask: (title) => set({ draggedTasks: title }),
// moveTasks: (text, status) =>
//   set((store) => ({
//     tasks: store.tasks.map((task) =>
//       task.id === id
//         ? { id, text: task.text, status: task.status }
//         : task
//     ),
//   })),
//       }),
//       { name: "drag-store" }
//     )
//   )
// );

const useTodoStore = create<Todostate>()(
  // devtools(
  //   persist(
  (set) => ({
    tasks: [],
    addTasks: (payload) =>
      set((store) => ({
        tasks: [...store.tasks, payload],
      })),
    deleteTasks: (id) =>
      set((store) => ({
        tasks: store.tasks.filter((task) => task.id !== id),
      })),
    dragedTasks: null,
    setDraggedTask: (payload: taskType) => set({ dragedTasks: payload }),
    moveTasks: (id, payload) =>
      set((store) => ({
        tasks: store.tasks.map((task) =>
          task.id === id ? { ...payload } : task
        ),
      })),
  })
  //     {
  //       name: "drag-store",
  //     }
  //   )
  // )
);

export default useTodoStore;
