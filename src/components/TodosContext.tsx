import React, { createContext, useState, FC } from "react";

type TodosContextState = {
  todos: string[];
  addTodo: (name: string) => void;
};

const contextDefaultValues: TodosContextState = {
  todos: [],
  addTodo: () => {},
};

export const TodosContext = createContext<TodosContextState>(
  contextDefaultValues
);

const TodosProvider: FC = ({ children }) => {
  const [todos, setTodos] = useState<string[]>(contextDefaultValues.todos);

  const addTodo = (newTodo: string) => setTodos((todos) => [...todos, newTodo]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
