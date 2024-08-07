const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv"); 
const TodoModel = require('./Models/ToDo')

dotenv.config(); 

const app = express();
app.use(cors({
  origin: "https://to-do-list-frontend-one.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());

mongoose
  .connect(mongodb+srv://subbu20204:F1GiFjggv7WjKyTD@cluster0.fghaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0) 
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const donebol = req.body.done;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: donebol })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("Server is Running");
});
