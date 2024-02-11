import { useMode, useModalInputs, useTasks } from "../../context/taskContext";
import getPriorityColor from "../../utils/Priority";
import Tags from "./Tags";
import { toast } from "react-toastify";

export default function Task({ task, onModalShow }) {
  const { editMode, setEditMode } = useMode();
  const { modaldata, setModaldata } = useModalInputs();
  const { dispatch } = useTasks();
  const { id, title, description, priority, complete } = task;

  const handleDelete = () => {
    const con = confirm(`Are you sure to delete ${title}`);
    if (con) {
      dispatch({
        type: "Task/Delete",
        payload: id,
      });
      toast.success(`${title} has been deleted!`);
    }
  };

  const handleEdit = () => {
    setModaldata({ ...task });
    setEditMode(true);
    onModalShow(true);
  };

  const handleComplete = () => {
    dispatch({ type: "Task/Handle/Complete", payload: id });
    toast.success(`${title} mark as completed!`);
  };

  return (
    <tr className="border-b border-[#2E3443] [&>td]:align-middle [&>td]:px-4 [&>td]:py-2">
      <td>
        {complete ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#40C057"
              d="M11.707,15.707C11.512,15.902,11.256,16,11,16s-0.512-0.098-0.707-0.293l-4-4c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0L11,13.586l8.35-8.35C17.523,3.251,14.911,2,12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10 c0-1.885-0.531-3.642-1.438-5.148L11.707,15.707z"
            ></path>
          </svg>
        ) : null}
      </td>
      <td>{title}</td>
      <td>
        <div className="w-[300px] xl:w-full">{description}</div>
      </td>

      <td className="text-center">
        <button
          disabled
          className={`border-2 border-solid border-blue-600 rounded-full py-1 px-4 ${getPriorityColor(
            priority
          )}`}
        >
          {priority}
        </button>
      </td>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <button className="text-red-500" onClick={handleDelete}>
            Delete
          </button>
          {!complete && (
            <button className="text-blue-500" onClick={handleEdit}>
              Edit
            </button>
          )}
          {!complete && (
            <button onClick={handleComplete}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
