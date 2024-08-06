import { useState } from "react";
import { useTodos, useTodosActions } from "@context";
import { CardTodo } from "../.";

import "./index.css";

export function ListTodo() {
  const [editingTodoId, setEditingTodoId] = useState<number>(-1);
  const items = useTodos();
  const actions = useTodosActions();

  /* console.log("ListTodo", items); */

  return (
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
  );
}
