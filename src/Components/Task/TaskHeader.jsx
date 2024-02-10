import { useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskModal from "../TaskModal";
import { useTasks } from "../../context/taskContext";
import { toast } from "react-toastify";
import { getTaskCountDetails } from "../../utils/taskCounter";

export default function TaskHeader({ onShow }) {
  const { tasks, dispatch } = useTasks();
  const { total, incomplete, complete } = getTaskCountDetails(tasks);

  const handleDelete = () => {
    const flag = confirm("Are you sure that you want to delete all the task?");
    if (flag) {
      dispatch({ type: "Task/Delete/All" });
      toast.success("All Task deleted!");
    }
  };
  return (
    <div className="mb-14 items-center justify-between sm:flex">
      <div>
        <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
        <ul className="assignment-status flex text-sm mt-2.5">
          <li className="mr-2 border-2 border-solid border-blue-600 rounded-full px-4">
            Total{" "}
            <span className="w-3 rounded-full bg-blue-600 text-xs px-1 ml-1">
              {total}
            </span>
          </li>
          <li className="mr-2 border-2 border-solid border-green-600 rounded-full px-4">
            Complete{" "}
            <span className="w-3 rounded-full bg-green-600 text-xs px-1 ml-1">
              {complete}
            </span>
          </li>
          <li className="border-2 border-solid border-orange-600 rounded-full px-4">
            Incomplete{" "}
            <span className="w-3 rounded-full bg-orange-600 text-xs px-1 ml-1">
              {incomplete}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-5">
        <TaskFilter />
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
  );
}
