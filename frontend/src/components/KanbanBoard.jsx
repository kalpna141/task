import React from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../slices/tasks/taskSlice";
import TaskModal from "./TaskModel";
import TaskList from "../slices/tasks/TaskList";

const KanbanBoard = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Task Management</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => dispatch(toggleModal("addTask"))}>
          Add Task
        </button>
      </div>

      <TaskModal />
      <TaskList />
    </div>
  );
};

export default KanbanBoard;
