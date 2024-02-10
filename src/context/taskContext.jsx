import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import initialTasks from "../data/Task.js";
import { taskReducer } from "../Reducers/taskReducer.js";

export const TaskContext = createContext(null);
export const SearchContext = createContext(null);
export const SortContext = createContext(null);
export const FilterContext = createContext(null);
export const ModalModeContext = createContext(null);
export const ModalInputContext = createContext(null);

export default function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [modaldata, setModaldata] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    complete: false,
  });

  useEffect(() => {
    //persist data from the localstorage
    const storedData = localStorage.getItem("todotasker");
    if (storedData) {
      const transformTasks = JSON.parse(storedData);
      dispatch({ type: "Task/Mount", payload: transformTasks });
    } else {
      //store some dummy todos for 1st time visit
      localStorage.setItem("todotasker", JSON.stringify(initialTasks));
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      <FilterContext.Provider value={{ filter, setFilter }}>
        <SearchContext.Provider value={{ keyword, setKeyword }}>
          <SortContext.Provider value={{ sort, setSort }}>
            <ModalModeContext.Provider value={{ editMode, setEditMode }}>
              <ModalInputContext.Provider value={{ modaldata, setModaldata }}>
                {children}
              </ModalInputContext.Provider>
            </ModalModeContext.Provider>
          </SortContext.Provider>
        </SearchContext.Provider>
      </FilterContext.Provider>
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export function useSearch() {
  return useContext(SearchContext);
}

export function useSort() {
  return useContext(SortContext);
}

export function useFilter() {
  return useContext(FilterContext);
}

export function useMode() {
  return useContext(ModalModeContext);
}

export function useModalInputs() {
  return useContext(ModalInputContext);
}
