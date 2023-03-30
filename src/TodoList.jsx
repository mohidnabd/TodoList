import axios from "axios";
import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title: title,
      completed: false,
    };

    axios.post("http://localhost:3000/todos", newTodo).then((res) => {
      setTodos([...todos, res.data]);
      setTitle("");
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
      setTodos(todos.filter((item) => item.id !== id));
    });
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });
    axios
      .put(
        `http://localhost:3000/todos/${id}`,
        updatedTodos.find((item) => item.id === id)
      )
      .then(() => setTodos(updatedTodos));
  };
  const handleEdit = (id, title) => {
    setEditTodoId(id);
    setEditTitle(title);
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTitle("");
  };

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editTitle,
        };
      } else {
        return todo;
      }
    });

    axios
      .put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        updatedTodos.find((todo) => todo.id === id)
      )
      .then(() => {
        setTodos(updatedTodos);
        setEditTodoId(null);
        setEditTitle("");
      });
  };

  return (
    <div>
      <ul>
        {todos.map((item) => (
          <li style={{ listStyleType: "none" }} key={item.id}>
            {editTodoId === item.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={handleEditTitleChange}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.title}
                </span>
                <button onClick={() => handleComplete(item.id)}>
                  {item.completed ? "Incomplete" : "Complete"}
                </button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => handleEdit(item.id, item.title)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default TodoList;
