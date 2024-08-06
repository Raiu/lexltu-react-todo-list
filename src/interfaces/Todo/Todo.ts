export interface ITodo {
  id: number;
  content: string;
  user: string;
  completed: boolean;
  deleted: boolean;
  timestamp: number;
}

export interface INewTodo {
    content: string;
    user: string;
}

export type TAction =
  | { type: ActionType.CREATE; data: INewTodo }
  | { type: ActionType.UPDATE; data: ITodo }
  | { type: ActionType.DELETE; data: number }
  | { type: ActionType.TOGGLE_COMPLETED; data: number };

export interface ITodoActions {
  createTodo: (todo: INewTodo) => void;
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
}
