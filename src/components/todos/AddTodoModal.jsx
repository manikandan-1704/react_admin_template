import React, { useState } from "react";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { useAddTodoMutation } from "../../redux/api/todoApi";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { toast } from "react-toastify";

const AddTodoModal = ({ isOpen, onClose }) => {
  const [addTodo] = useAddTodoMutation();
  const [formData, setFormData] = useState({ title: "", userId: "" });
  const [errors, setErrors] = useState({});

  const { data: users = [], isLoading: usersLoading, error: usersError } = useGetUsersQuery();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.userId.trim()) tempErrors.userId = "User is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await addTodo(formData).unwrap();
      toast.success("Todo added successfully!");
      setFormData({ title: "", userId: "" });
      onClose();
    } catch (err) {
      toast.error("Failed to add todo");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Todo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter title"
          required
        />

        <label htmlFor="userId" className="block mb-1 font-medium">
          User
        </label>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : usersError ? (
          <p className="text-red-600">Error loading users</p>
        ) : (
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            error={errors.userId}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        )}
        {errors.userId && <p className="text-red-600 text-sm mt-1">{errors.userId}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
