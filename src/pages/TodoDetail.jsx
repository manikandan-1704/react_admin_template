import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetUsersQuery } from "../redux/api/userApi";
import { useGetTodosQuery } from "../redux/api/todoApi";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";

const TodoDetail = () => {
  const { id } = useParams();
  const { data: todos, error: todosError, isLoading: todosLoading } = useGetTodosQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery();
  const loading = useSelector((state) => state.ui.loading);

  if (loading || todosLoading || usersLoading) return <p className="text-center mt-10">Loading...</p>;
  if (todosError) return <p className="text-red-500 text-center mt-10">Error loading todos</p>;
  if (usersError) return <p className="text-red-500 text-center mt-10">Error loading users</p>;

  const todo = todos?.find((t) => t.id === Number(id));
  if (!todo) return <p className="text-center mt-10">Todo not found</p>;

  const user = users?.find((u) => u.id === todo.userId);
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/todos" className="flex items-center text-blue-600 mb-4 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to todos
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="mt-2 flex items-center justify-center text-gray-600">
          {todo.title}
        </p>
        <p className="mt-2 flex items-center justify-center text-gray-600">
          <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
        </p>

        <div className="mt-6">
          <span className="px-4 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
            {todo.completed ? "Completed" : "Not Completed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
