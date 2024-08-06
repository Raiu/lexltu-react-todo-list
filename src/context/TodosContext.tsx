import React from "react";

import { todos as initialTodos } from "@data";
import { ActionType, INewTodo, ITodo, ITodoActions, TAction } from "@interfaces/Todo";

import { users as usersData } from "@data";

const TodosContext = React.createContext<ITodo[]>([] as ITodo[]);
const TodosDispatchContext = React.createContext<React.Dispatch<TAction> | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducer, initialTodos);

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos(): ITodo[] {
  const context = React.useContext(TodosContext);
  if (context === null) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
}

export function useTodosActions(): ITodoActions {
  const dispatch = React.useContext(TodosDispatchContext);
  if (dispatch === null) {
    throw new Error("useTodosActions must be used within a TodosProvider");
  }

  const createTodo = (newTodo: INewTodo) => {
    dispatch({ type: ActionType.CREATE, data: newTodo });
  };

  const updateTodo = (todo: ITodo) => {
    dispatch({ type: ActionType.UPDATE, data: todo });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: ActionType.DELETE, data: id });
  };

  const toggleCompletedTodo = (id: number) => {
    dispatch({ type: ActionType.TOGGLE_COMPLETED, data: id });
  };

  return { createTodo, updateTodo, deleteTodo, toggleTodo: toggleCompletedTodo };
}

function reducer(state: ITodo[], action: TAction): ITodo[] {
  if (!action.data) {
    throw new Error("Action payload is empty");
  }

  switch (action.type) {
    case ActionType.CREATE: {
      const newId = state.reduce((m, i) => Math.max(m, i.id), 0) + 1;
      const userName = isEmpty(action.data.user)
        ? usersData[Math.floor(Math.random() * usersData.length)].name
        : action.data.user;

      return [
        ...state,
        {
          id: newId,
          user: userName,
          content: action.data.content,
          completed: false,
          deleted: false,
          timestamp: Date.now(),
        },
      ];
    }

    case ActionType.UPDATE: {
      return state.map((x) => (x.id === action.data.id ? { ...x, ...action.data } : x));
    }

    case ActionType.DELETE: {
      return state.map((x) => (x.id === action.data ? { ...x, deleted: true } : x));
    }

    case ActionType.TOGGLE_COMPLETED: {
      return state.map((x) => (x.id === action.data ? { ...x, completed: !x.completed } : x));
    }

    default:
      return state;
  }
}
type TisEmpty = string | number | boolean | null | undefined | object | [];
function isEmpty(value: TisEmpty): boolean {
  return value == null || (typeof value === "string" && value.trim().length === 0);
}
