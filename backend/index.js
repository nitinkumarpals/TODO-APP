import express from "express";
import { createTodo, updateTodo } from "./types.js";
import { todo } from "./db.js"
import cors from "cors"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/todo", async (req, res) => {
  const createPayLoad = req.body;
  const parsedPayLoad = createTodo.safeParse(createPayLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      message: "You sent wrong inputs",
    });
    return;
  }
  //put it in mango db
  await todo.create({
    title: createPayLoad.title,
    description: createPayLoad.description,
    completed: false
  });
  res.json({
    message: 'todo created'
  })
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({todos});
});

app.patch("/completed", async (req, res) => {
  const updatePayLoad = req.body;
  const parsedPayLoad = updateTodo.safeParse(updatePayLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({
      message: "You sent wrong inputs",
    });
    return;
  }
  await todo.updateOne(
    { _id: req.body.id },
      { $set: { completed: true } }
  )

  res.json({
    message: "Todo marked as completed"
  })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
