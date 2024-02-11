import { useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskModal from "../TaskModal";
import { useFilter, useTasks } from "../../context/taskContext";
import { toast } from "react-toastify";
import { getTaskCountDetails } from "../../utils/taskCounter";

export default function TaskHeader({ onShow }) {
  const { tasks, dispatch } = useTasks();
  const { filter, setFilter } = useFilter();
  const { total, incomplete, complete } = getTaskCountDetails(tasks);

  const handleDelete = () => {
    const flag = confirm("Are you sure that you want to delete all the task?");
    if (flag) {
      dispatch({ type: "Task/Delete/All" });
      toast.success("All Task deleted!");
    }
  };
  return (
    <div className="mb-14 items-center justify-between sm:flex space-y-4">
      <div className="xl:w-1/4">
        <h2 className="text-2xl font-semibold max-sm:mb-4">Task Details</h2>
        <ul className="assignment-status flex text-sm mt-2.5 gap-x-2">
          <li>
            <button
              className={`lg:px-3 border-2 border-solid border-blue-600 rounded-full py-1 px-2 ${
                filter == "all" ? "bg-blue-500" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All{" "}
              <span className="w-3 rounded-full bg-blue-600 text-xs px-1 ml-1">
                {total}
              </span>
            </button>
          </li>
          <li>
            <button
              className={`border-2 border-solid border-green-600 rounded-full py-1 px-2 ${
                filter == "complete" ? "bg-green-500" : ""
              }`}
              onClick={() => setFilter("complete")}
            >
              Complete{" "}
              <span className="w-3 rounded-full bg-green-600 text-xs px-1 ml-1">
                {complete}
              </span>
            </button>
          </li>
          <li>
            <button
              className={`border-2 border-solid border-orange-600 rounded-full py-1 px-2 ${
                filter == "incomplete" ? "bg-orange-500" : ""
              }`}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete{" "}
              <span className="w-3 rounded-full bg-orange-600 text-xs px-1 ml-1">
                {incomplete}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="flex items-center flex-col sm:flex-row md:flex-col xl:flex-row xl:w-3/4 lg:gap-y-4 md:gap-y-4 gap-y-4">
        <TaskFilter />
        <div className="flex items-center space-x-5 xl:w-[25%] xl:justify-end">
          <button
            className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={onShow}
          >
            Add Task
          </button>
          <button
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={handleDelete}
            disabled={tasks.length == 0}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
