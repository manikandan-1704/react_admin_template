import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { useUpdateTodoMutation } from "../../redux/api/todoApi";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { toast } from "react-toastify";

const UpdateTodoModal = ({ isOpen, onClose, todo }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const [formData, setFormData] = useState({
    title: "",
    userId: "",
    completed: false,
  });
  const [errors, setErrors] = useState({});

  // Pre-fill form when todo changes
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        userId: todo.userId || "",
        completed: todo.completed || false,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "completed" ? value === "true" : value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.userId) tempErrors.userId = "User is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateTodo({ id: todo.id, ...formData }).unwrap();
      toast.success("Todo updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to update todo");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Todo">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <TextInput
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        {/* User dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">User</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
            required
          >
            <option value="">-- Select User --</option>
            {usersLoading ? (
              <option disabled>Loading users...</option>
            ) : (
              users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
          {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}
        </div>

        {/* Status dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="completed"
            value={formData.completed}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value={true}>Completed</option>
            <option value={false}>Not Completed</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateTodoModal;
