import { useState } from "react";
import TaskHeader from "./Task/TaskHeader";
import TaskList from "./Task/TaskList";
import TaskModal from "./TaskModal";

export default function TaskBoard() {
  const [show, setShow] = useState(false);
  return (
    <section className="mb-20" id="tasks">
      {show && <TaskModal onClose={() => setShow(false)} />}
      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-4 md:py-16 lg:px-12 2xl:px-8">
          <TaskHeader onShow={() => setShow(true)} />
          <TaskList onModalShow={setShow} />
        </div>
      </div>
    </section>
  );
}
