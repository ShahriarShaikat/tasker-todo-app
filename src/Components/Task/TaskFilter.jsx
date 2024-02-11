import { useState } from "react";
import { useSearch, useSort, useTasks } from "../../context/taskContext";

export default function TaskFilter() {
  const [value, setValue] = useState("");
  const { keyword, setKeyword } = useSearch();
  const { sort, setSort } = useSort();
  const { tasks } = useTasks();

  const handleChange = (e) => {
    const key = e.target.value;
    setValue(key);
    if (key.length == 0) {
      setKeyword("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full xl:w-[40%] flex xl:justify-center"
      >
        <div className="flex xl:w-3/4 w-full">
          <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px] w-full xl:min-w-[300px] ">
            <input
              type="search"
              id="search-dropdown"
              className="z-20 block w-full bg-gray-800 px-4 py-2.5 pr-10 focus:outline-none"
              placeholder="Search Task"
              value={value}
              onChange={handleChange}
              required
              disabled={tasks.length == 0}
            />
            <button
              type="submit"
              className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <select
        class="cursor-pointer rounded-md px-4 py-2 text-center text-white-600 bg-gray-800 focus:outline-none w-full xl:w-[35%] xl:m-0 xl:py-2.5"
        name="sortBy"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="low_to_high">Priority (Low-High)</option>
        <option value="high_to_low">Priority (High-Low)</option>
      </select>
    </>
  );
}
