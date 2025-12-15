import React from "react";
import "./App.css";

const TodosList = ({ todolist, deleteHandler, toggleComplete }) => {
  if (todolist.length === 0) {
    return (
      <p className="empty-state" role="status"> 
        No tasks yet. Add your first todo 👆
      </p>
    );
  }

  return (
    <div className="todo-list">
      {todolist.map((todo, index) => (
        <div
          key={index}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <label className="todo-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span className="todo-text">{todo.text}</span>
          </label>

          <button
            className="delete-btn"
            aria-label={`Delete task ${todo.text}`}
            onClick={() => deleteHandler(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
