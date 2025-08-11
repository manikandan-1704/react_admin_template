import React, { useState } from "react";
import PageLayout from "../components/layouts/pageLayout";
import { useGetUsersQuery } from "../redux/api/userApi";
import Table from "../components/common/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AddUserModal from "../components/users/AddUserModal";

const Users = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [showAddModal, setShowAddModal] = useState(false);

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
                <button className="icon-button"><FaEye /></button>
                <button className="icon-button"><FaEdit /></button>
                <button className="icon-button"><FaTrash /></button>
              </td>
            </tr>
          )}
        />
      </PageLayout>

      {/* Global Modal usage */}
      <AddUserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
};

export default Users;
