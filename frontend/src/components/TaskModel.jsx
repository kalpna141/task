import React, { useState, useEffect } from "react";
import { toggleModal, addTask } from "../slices/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../slices/auth/authSlice";

const TaskModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.tasks.showModal);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    status: "",
    priority: "",
    assignee: "",
    dueDate: "",
    subtask: "",
  });

  useEffect(() => {
    if (showModal) {
      dispatch(fetchUsers())
        .then((result) => {
          if (result.payload && result.payload.data) {
            setUsers(result.payload.data);
          }
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [dispatch, showModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      subtask: formData.subtask ? [formData.subtask] : [],
    };
    dispatch(addTask(formattedData));
    dispatch(toggleModal());
  };

  if (!showModal) return null;

  return (
    <div className="modal-content">
      <button className="close-btn" onClick={() => dispatch(toggleModal())}>
        ×
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <select
          name="status"
          onChange={handleChange}
          value={formData.status}
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
        </select>

        <select
          name="priority"
          onChange={handleChange}
          value={formData.priority}
          required
        >
          <option value=""> Select Priority </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select name="assignee" onChange={handleChange} required>
          <option value="">Select Assignee</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <input type="date" name="dueDate" onChange={handleChange} />
        <input
          type="text"
          name="subtask"
          placeholder="Subtask"
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskModal;
