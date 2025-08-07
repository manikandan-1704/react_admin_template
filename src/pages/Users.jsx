import React from "react";
import PageLayout from "../components/layouts/pageLayout";
import { useGetUsersQuery } from '../redux/api/userApi';


const Users = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <PageLayout title="User List">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching users</p>}
      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user.id} className="p-3 border rounded shadow-sm">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};

export default Users;