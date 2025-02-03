import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, toggleModal, updateTaskByStatus } from "./taskSlice";
import socket from "../../utils/socket";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskModal from "../../components/TaskModel";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [selectedTaskId, setSelectedTaskId] = useState("");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    socket.on("taskUpdated", (updatedTask) => {
      dispatch(updateTaskByStatus(updatedTask));
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [dispatch]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    dispatch(updateTaskByStatus(taskId, newStatus));

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );

    dispatch({ type: "tasks/setTasks", payload: updatedTasks });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleSubtaskClick = (taskId) => {
    setSelectedTaskId(taskId);
    dispatch(toggleModal("addSubtask"));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Task List</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {["pending", "in_progress", "completed"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: "30%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    minHeight: "300px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h3 style={{ textAlign: "center" }}>
                    {status.replace("_", " ").toUpperCase()}
                  </h3>
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task._id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "10px",
                            margin: "10px 0",
                            backgroundColor: snapshot.isDragging
                              ? "#d1e7dd"
                              : "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <h4>{task.title}</h4>
                          <p>Priority: {task.priority}</p>

                          <button>Add Subtask</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {selectedTaskId && <TaskModal />}
    </div>
  );
};

export default TaskList;
