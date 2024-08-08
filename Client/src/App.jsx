import { useEffect, useState } from "react";
import "./App.css";
import Create from "./Components/Create";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const handleDone = (id) => {
    axios
      .put(`https://to-do-list-api-delta.vercel.app/todos/${id}`, { done: true })
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotDone = (id) => {
    axios
      .put(`https://to-do-list-api-delta.vercel.app/todos/${id}`, { done: false })
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://to-do-list-api-delta.vercel.app/delete/${id}`)
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://to-do-list-api-delta.vercel.app/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, [todos]);

  return (
    <div className="bg-slate-800 flex justify-center items-center flex-col h-screen">
      <h2 className="text-3xl font-bold text-white mb-4">To Do List</h2>
      <Create />
      {todos.length === 0 ? (
        <div className="text-lg text-gray-200">No records</div>
      ) : (
        <div className="flex flex-col w-full max-w-md">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <span className={`text-lg ${todo.done ? "line-through" : ""}`}>
                {todo.task}
              </span>

              <div className="flex items-center">
                {todo.done ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => {
                      handleNotDone(todo._id);
                    }}
                  >
                    Not Done
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => {
                      handleDone(todo._id);
                    }}
                  >
                    Done
                  </button>
                )}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleDelete(todo._id)}}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
