import React from "react";
import axios from "axios";

function Create() {
  const [Task, setTask] = React.useState("");
  const handleAdd = () => {
    axios
      .post("https://to-do-list-api-delta.vercel.app/add", { task: Task })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col w-full max-w-md mb-4 ">
      <input
        type="text"
        placeholder="Enter task"
        id="task"
        className="bg-white shadow-md rounded-lg p-4 w-full mb-2"
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default Create;
