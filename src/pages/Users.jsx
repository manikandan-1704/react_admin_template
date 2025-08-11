import React, { useState } from "react";
import PageLayout from "../components/layouts/pageLayout";
import { useGetUsersQuery } from "../redux/api/userApi";
import Table from "../components/common/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AddUserModal from "../components/users/AddUserModal";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "../components/users/UpdateUserModal";
import { useDeleteUserMutation } from "../redux/api/userApi";
import Modal from "../components/common/Modal";
import { toast } from "react-toastify";



const Users = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteUser] = useDeleteUserMutation();


    const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

    const handleDelete = (userId) => {
      setUserToDelete(userId);
      setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
  try {
    await deleteUser(userToDelete).unwrap();
    toast.success("User deleted successfully!");
    console.log("User deleted:", userToDelete);
  } catch (err) {
    console.error("Failed to delete user:", err);
    toast.error("Failed to delete user");
  } finally {
    setShowDeleteModal(false);
    setUserToDelete(null);
  }
};



  return (
    <>
      <PageLayout
        title="User List"
        headerActions={
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            Add User
          </button>
        }
      >
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching users</p>}

        <Table
          columns={["S.No", "Name", "Email", "Phone", "Status", "Actions"]}
          data={users || []}
          renderRow={(user, index) => (
            <tr key={user.id} className="border-t">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">
                <span className={`badge ${index % 2 === 0 ? "badge-active" : "badge-inactive"}`}>
                  {index % 2 === 0 ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="border px-4 py-2">
                <button className="icon-button" onClick={() => navigate(`/users/${user.id}`)}><FaEye /></button>
                <button className="icon-button" onClick={() => handleEdit(user)}><FaEdit /></button>
                <button className="icon-button" onClick={() => handleDelete(user.id)}><FaTrash /></button>
              </td>
            </tr>
          )}
        />
      </PageLayout>

      <AddUserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <UpdateUserModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} user={selectedUser} />

      {showDeleteModal && (
  <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
    <p>Are you sure you want to delete this user?</p>
    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={() => setShowDeleteModal(false)}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      <button
        onClick={confirmDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Yes, Delete
      </button>
    </div>
  </Modal>
)}

    </>
  );
};

export default Users;
