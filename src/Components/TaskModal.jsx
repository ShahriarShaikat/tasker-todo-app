import { useState } from "react";
import { toast } from "react-toastify";
import { isValidate } from "../utils/Validate";
import { useModalInputs, useMode, useTasks } from "../context/taskContext";
import { getNextID } from "../utils/Validate";

export default function TaskModal({ onClose }) {
  const [isEdited, setIsEdited] = useState(false);
  const { editMode, setEditMode } = useMode();
  const { modaldata, setModaldata } = useModalInputs();
  const { tasks, dispatch } = useTasks();
  const handleChange = (e) => {
    if (editMode && !isEdited) {
      setIsEdited(true);
    }
    setModaldata({
      ...modaldata,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (isValidate(modaldata)) {
      const payload = {
        ...modaldata,
        id: getNextID(tasks),
      };
      dispatch({
        type: "Task/Add",
        payload: payload,
      });

      setModaldata({
        id: "",
        title: "",
        description: "",
        priority: "",
        complete: false,
      });
      onClose();
      toast.success("A new task has been added!");
    } else {
      toast.warning("Please provide all the field values");
    }
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    if (isEdited) {
      if (isValidate(modaldata)) {
        dispatch({
          type: "Task/Edit",
          payload: {
            ...modaldata,
          },
        });

        setModaldata({
          id: "",
          title: "",
          description: "",
          priority: "",
          complete: false,
        });
        setEditMode(false);
        onClose();
        setIsEdited(false);
        toast.success("Task Updated!");
      } else {
        toast.warning("Please provide all the field values");
      }
    } else {
      toast.warning("Nothing changes to update for the task!");
    }
  };

  const handleClose = () => {
    setModaldata({
      id: "",
      title: "",
      description: "",
      priority: "",
      complete: false,
    });
    setEditMode(false);
    onClose();
  };
  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-50 absolute top-0 left-0"></div>
      <form
        className="mx-auto my-10 w-4/5 max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-50 absolute top-1/4 left-0 right-0"
        onSubmit={editMode ? handleEditTask : handleAddTask}
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {editMode ? "Edit Task" : "Add New Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={modaldata.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={modaldata.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={modaldata.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="mr-2 rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {editMode ? "Save" : "Create new Task"}
          </button>
          <button
            className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
