import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";

const UpdateUserModal = ({ isOpen, onClose, user }) => {
  const [updateUser] = useUpdateUserMutation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateUser({ id: user.id, ...formData }).unwrap();
      toast.success("User updated successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput name="name" label="Name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <TextInput name="email" type="email" label="Email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <TextInput name="phone" label="Phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />

        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;
