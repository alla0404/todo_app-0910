"use client";

import React, { useState } from "react";

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setnewTodoTitle] = useState("");

  const addTodo = () => {
    if (newTodoTitle.trim().length == 0) return;

    const title = newTodoTitle.trim();
    todoStatus.addTodo(title);
    setnewTodoTitle("");
  };

  return (
    <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
      <input
        className="input input-bordered"
        type="text"
        value={newTodoTitle}
        placeholder="새 할일을 입력해주세요."
        onChange={(e) => setnewTodoTitle(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTodo}>
        할일추가
      </button>
    </form>
  );
};

const TodoListItem = ({ todo, todoStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };

  const modifyTodo = () => {
    if (newTodoTitle.trim().length == 0) return;

    todoStatus.modifyTodo(todo.id, newTodoTitle.trim());
    setEditMode(false);
  };

  const modifyEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setNewTodoTitle(todo.title);
  };

  return (
    <li className="flex gap-[5px]">
      <span className="badge badge-outline badge-primary">{todo.id}</span>
      {editMode ? (
        <form className="flex gap-[5px]" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input input-bordered"
            type="text"
            value={newTodoTitle}
            placeholder="새 할일을 입력해주세요."
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button className="btn btn-outline btn-success" onClick={modifyTodo}>
            수정완료
          </button>
          <button className="btn btn-outline btn-warning" onClick={cancelEdit}>
            수정취소
          </button>
        </form>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="btn-group flex gap-2">
            <button className="btn btn-xs btn-outline" onClick={modifyEditMode}>
              수정
            </button>
            <button
              className="btn btn-xs btn-outline btn-secondary"
              onClick={removeTodo}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

const TodoList = ({ todoStatus }) => {
  return (
    <>
      <nav className="menu-box mt-3">
        <ul>
          {todoStatus.todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
          ))}
        </ul>
      </nav>
    </>
  );
};

const useTodoStatus = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    const newTodo = {
      id,
      title,
    };

    setTodos([...todos, newTodo]);
    setLastTodoId(id);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const modifyTodo = (id, title) => {
    const newTodos = todos.map((todo) =>
      todo.id != id ? todo : { ...todo, title },
    );

    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
};

const App = () => {
  const todoStatus = useTodoStatus();

  return (
    <>
      <NewTodoForm todoStatus={todoStatus} />
      <TodoList todoStatus={todoStatus} />
    </>
  );
};

export default App;
