import React, { useState } from "react";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { useAddUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";


const AddUserModal = ({ isOpen, onClose }) => {
  const [addUser] = useAddUserMutation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addUser(formData).unwrap();
    toast.success("User added successfully!");
    onClose();
  } catch (err) {
    toast.error("Failed to add user");
  }
};

   return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput name="name" label="Name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        <TextInput name="email" type="email" label="Email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        <TextInput name="phone" label="Phone" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />

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


export default AddUserModal;
