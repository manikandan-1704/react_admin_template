import React from "react";
import PageLayout from "../components/layouts/pageLayout";
import Table from "../components/common/Table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useGetTodosQuery } from "../redux/api/todoApi";
import { useGetUsersQuery } from "../redux/api/userApi";
import TruncatedCell from "../components/common/TruncatedCell";


const Todos = () => {
  
  const { data: todos, isLoading: todosLoading, error: todosError } = useGetTodosQuery();
  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersQuery();

  if (todosLoading || usersLoading) return <div>Loading...</div>;
  if (todosError) return <div>Error loading todos: {todosError.message}</div>;
  if (usersError) return <div>Error loading users: {usersError.message}</div>;

  const userMap = {};
  users.forEach(user => {
    userMap[user.id] = user.name;
  });

  return (
    <PageLayout title="Todos">
      <Table
          columns={["S.No", "Username", "Task", "Status", "Actions"]}
          data={todos || []}
          renderRow={(todo, index) => (
            <tr key={todo.id} className="border-t">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{userMap[todo.userId] || "Unknown"}</td>
              <TruncatedCell text={todo.title} />
              <td className="border px-4 py-2">
                <span className={`badge ${todo.completed === true ? "badge-active" : "badge-inactive"}`}>
                  {todo.completed === true ? "Completed" : "Not Completed"}
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
  );
};

export default Todos;