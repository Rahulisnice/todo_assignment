import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// CREATE TODO
const createTodo = async (data) => {
  const response = await axios.post(BASE_URL, {
    title: data.title,
    completed: false,
  });

  return {
    data: {
      _id: response.data.id,
      title: response.data.title,
      description: "",
      isCompleted: false,
      createdAt: new Date().toISOString(),
    },
  };
};

// GET ALL TODOS
const getAllTodo = async () => {
  const response = await axios.get(BASE_URL);

  const mapped = response.data.slice(0, 20).map((todo) => ({
    _id: todo.id,
    title: todo.title,
    description: "",
    isCompleted: todo.completed,
    createdAt: new Date().toISOString(),
  }));

  return { data: { todos: mapped } };
};

// UPDATE TODO
const updateTodo = async (id, data) => {
  await axios.patch(`${BASE_URL}/${id}`, {
    title: data.title,
    completed: data.isCompleted,
  });

  return { data: { success: true } };
};

// DELETE TODO
const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return { data: { success: true } };
};

export default { createTodo, getAllTodo, updateTodo, deleteTodo };
