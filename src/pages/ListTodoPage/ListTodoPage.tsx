import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos, useTodosActions } from "@context";
import { CardTodo } from "@components/Todo";
import { sortTodos } from "./helpers";

import "./index.css";

interface ISortOptions {
  value: string;
  label: string;
  field: string;
  asc: boolean;
}

const sortOptions: ISortOptions[] = [
  { value: "priorityAsc", label: "Priority", field: "order", asc: true },
  { value: "priorityDesc", label: "Priority", field: "order", asc: false },
  { value: "authorAsc", label: "Author", field: "user", asc: true },
  { value: "authorDesc", label: "Author", field: "user", asc: false },
  { value: "timeAsc", label: "Time", field: "timestamp", asc: true },
  { value: "timeDesc", label: "Time", field: "timestamp", asc: false },
];

export function ListTodoPage(): ReactElement {
  const [editingTodoId, setEditingTodoId] = useState<number>(-1);
  const [sorting, setSorting] = useState<ISortOptions>(sortOptions[0]);
  const todos = useTodos();
  const actions = useTodosActions();
  const navigate = useNavigate();
  const sortedTodos = sortTodos(todos, sorting.field, sorting.asc);

  console.log("sortedTodos: ", sortedTodos);

  /* console.log("ListTodo", items); */

  return (
    <div className="list-todo-page">
      <div className="actions" style={{ display: "flex", justifyContent: "space-between", padding: "0 2rem"}}>
        <button className="btn" onClick={() => navigate("/add")}>
          Add Todo
        </button>
        {/* <input name="filter-query" type="text" placeholder="Filter..." /> */}
        {/* <select name="sort-by" onChange={(e) => setSortBy(e.target.value)}></select> */}
        <SortSelect options={sortOptions} current={sorting} setSorting={setSorting} />
      </div>
      <div className="list-todo">
        {sortedTodos ? (
          sortedTodos.map(
            (todo) =>
              !todo.deleted && (
                <CardTodo
                  key={todo.id}
                  todo={todo}
                  actions={actions}
                  setEditingTodoId={setEditingTodoId}
                  editingTodoId={editingTodoId}
                  changeOrderTodo={actions.changeOrderTodo}
                />
              )
          )
        ) : null}
      </div>
    </div>
  );
}

interface ISortSelectProps {

  options: ISortOptions[];
  current: ISortOptions;
  setSorting: (value: ISortOptions) => void;
}
export function SortSelect({options, current, setSorting}: ISortSelectProps): ReactElement {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = options.find(x => x.value === e.target.value);
    if (newOption) {
      setSorting(newOption);
    }
  }

  return (
    <select className="SortSelect-select" name="sort-by" value={current.value} onChange={onChange}>
      {options.map((x, i) => (
        <option className="SortSelect-option" key={i} value={x.value}>{x.label}</option>
      ))}
    </select>
  )
}

