import { createContext, useContext, useReducer, useState } from "react";
import initialTasks from "../data/Task.js";
import { taskReducer } from "../Reducers/taskReducer.js";

export const TaskContext = createContext(null);
export const SearchContext = createContext(null);
export const ModalModeContext = createContext(null);
export const ModalInputContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [keyword, setKeyword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [modaldata, setModaldata] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    complete: false,
  });

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      <SearchContext.Provider value={{ keyword, setKeyword }}>
        <ModalModeContext.Provider value={{ editMode, setEditMode }}>
          <ModalInputContext.Provider value={{ modaldata, setModaldata }}>
            {children}
          </ModalInputContext.Provider>
        </ModalModeContext.Provider>
      </SearchContext.Provider>
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export function useSearch() {
  return useContext(SearchContext);
}

export function useMode() {
  return useContext(ModalModeContext);
}

export function useModalInputs() {
  return useContext(ModalInputContext);
}
