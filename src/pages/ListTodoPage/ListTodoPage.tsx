import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos, useTodosActions } from "@context";
import { CardTodo } from "@components/Todo";

import "@components/Todo/ListTodo/index.css";

export function ListTodoPage() {
  const [editingTodoId, setEditingTodoId] = useState<number>(-1);
  const items = useTodos();
  const actions = useTodosActions();
  const navigate = useNavigate();

  /* console.log("ListTodo", items); */

  return (
    <div className="list-todo-page">
      <div className="actions">
        <button className="btn" onClick={() => navigate("/add")}>
          Add Todo
        </button>
      </div>
      <div className="list-todo">
        {items ? (
          [...items]
            .reverse()
            .map(
              (todo) =>
                !todo.deleted && (
                  <CardTodo
                    key={todo.id}
                    todo={todo}
                    actions={actions}
                    setEditingTodoId={setEditingTodoId}
                    editingTodoId={editingTodoId}
                  />
                )
            )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
