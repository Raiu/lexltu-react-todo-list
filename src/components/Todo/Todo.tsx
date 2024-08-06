/* import { TodosProvider } from "@context"; */
import { AddTodo, ListTodo } from "@components/Todo";

import "./index.css";

export function Todo() {
    return (
        <div className="todo">
            <AddTodo />
            <ListTodo />
        </div>
    )
}