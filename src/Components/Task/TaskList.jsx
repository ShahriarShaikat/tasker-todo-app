//import { useState } from "react";
import Task from "./Task";
import taskImage from "../../assets/file-list-3-fill.png";
import {
  useFilter,
  useSearch,
  useSort,
  useTasks,
} from "../../context/taskContext.jsx";
import {
  getTaskByPriority,
  getTaskByFilter,
  getTaskBySearch,
} from "../../utils/TaskFilter.js";

export default function TaskList({ onModalShow }) {
  const { tasks, dispatch } = useTasks();
  const { keyword } = useSearch();
  const { sort } = useSort();
  const { filter: filterkey } = useFilter();

  let filterTask = tasks.slice();

  if (filterTask.length > 0) {
    if (keyword.length > 0) {
      filterTask = getTaskBySearch(filterTask, keyword);
    }

    if (filterkey == "complete") {
      filterTask = getTaskByFilter(filterTask, true);
    }

    if (filterkey == "incomplete") {
      filterTask = getTaskByFilter(filterTask, false);
    }

    if (sort) {
      filterTask = getTaskByPriority(filterTask, sort);
    }
  }

  let taskHtml =
    filterTask.length > 0 ? (
      <div className="overflow-auto">
        <table className=" overflow-auto w-full">
          <thead>
            <tr>
              <th className="p-3 pb-3 text-sm font-semibold capitalize w-[48px]"></th>
              <th className="p-3 pb-3 text-sm font-semibold capitalize w-[300px]">
                {" "}
                Title{" "}
              </th>
              <th className="p-3 pb-3 text-sm font-semibold capitalize w-auto">
                {" "}
                Description{" "}
              </th>

              <th className="p-3 pb-3 text-sm font-semibold capitalize w-[100px]">
                {" "}
                Priority{" "}
              </th>
              <th className="p-3 pb-3 text-sm font-semibold capitalize w-[200px]">
                {" "}
                Options{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {filterTask.map((task) => (
              <Task key={task.id} task={task} onModalShow={onModalShow} />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="overflow-auto">
        <div className="flex justify-center mb-2">
          <img src={taskImage} alt="taskImage" />
        </div>
        <p className="text-center text-slate-200 font-\[Inter\] text-xl mb-2 font-medium">
          Task List is empty!
        </p>
        <p className="text-center text-zinc-500 text-base mb-2 font-sans">
          The task you are looking for is not currently availabile. It may
          deleted or removed!
        </p>
      </div>
    );
  return taskHtml;
}
