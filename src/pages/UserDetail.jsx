import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetUsersQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";

const UserDetail = () => {
  const { id } = useParams();
  const { data: users, error } = useGetUsersQuery();
  const loading = useSelector((state) => state.ui.loading);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error loading user</p>;

  const user = users?.find((u) => u.id === Number(id));
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/users" className="flex items-center text-blue-600 mb-4 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Users
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
          {user.name.charAt(0)}
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="mt-2 flex items-center justify-center text-gray-600">
          <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
        </p>
        <p className="mt-1 flex items-center justify-center text-gray-600">
          <FaPhone className="mr-2 text-green-500" /> {user.phone}
        </p>

        <div className="mt-6">
          <span className="px-4 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
