import Status from "./components/status";

const Todo = () => {
  return (
    <div className=" my-10">
      <h1 className=" my-3">Hello To do list</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eius
        accusantium aut ab perspiciatis assumenda voluptatem magni, voluptatibus
        ullam odio et, aperiam magnam unde, provident saepe quia molestiae
        repudiandae reprehenderit.
      </p>
      <div className=" flex gap-4 justify-center items-start">
        <Status title={"ONGOING"} />
        <Status title={"DONE"} />
        <Status title={"PLANNED"} />
      </div>
    </div>
  );
};

export default Todo;
