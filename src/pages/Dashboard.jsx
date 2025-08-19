import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, UserX, ListTodo, Package } from "lucide-react";
import PageLayout from "../components/layouts/pageLayout";
import { useGetUsersQuery } from "../redux/api/userApi";
import { useGetTodosQuery } from "../redux/api/todoApi";
import { useGetProductsQuery } from "../redux/api/productApi";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: todos, isLoading: todosLoading } = useGetTodosQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  if (usersLoading || todosLoading || productsLoading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter((u) => u.id % 2 === 0).length || 0;
  const inactiveUsers = totalUsers - activeUsers;

  const totalProducts = products?.products?.length || 0;
  const pendingTodos = todos?.filter((t) => !t.completed).length || 0;
  const completedTodos = todos?.length - pendingTodos;

  const cards = [
    { title: "Total Users", value: totalUsers, color: "from-blue-400 to-blue-600", icon: <Users className="w-8 h-8" />, path: "/users" },
    { title: "Active Users", value: activeUsers, color: "from-green-400 to-green-600", icon: <UserCheck className="w-8 h-8" />, path: "/users" },
    { title: "Inactive Users", value: inactiveUsers, color: "from-red-400 to-red-600", icon: <UserX className="w-8 h-8" />, path: "/users" },
    { title: "Pending Todos", value: pendingTodos, color: "from-yellow-400 to-yellow-600", icon: <ListTodo className="w-8 h-8" />, path: "/todos" },
    { title: "Total Products", value: totalProducts, color: "from-purple-400 to-purple-600", icon: <Package className="w-8 h-8" />, path: "/products" },
  ];

  // Chart data
  const userData = [
    { name: "Active", value: activeUsers },
    { name: "Inactive", value: inactiveUsers },
  ];
  const todoData = [
    { name: "Pending", value: pendingTodos },
    { name: "Completed", value: completedTodos },
  ];
  const productData = products?.products?.map((p) => ({
    name: `#${p.id}`,
    value: p.stock,
  })) || [];

  const COLORS = ["#34d399", "#f87171", "#60a5fa", "#facc15"];

  return (
    <PageLayout title="Dashboard">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(card.path)}
            className={`cursor-pointer rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-white bg-gradient-to-r ${card.color}`}
          >
            <div className="mb-3">{card.icon}</div>
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users Pie Chart */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Users Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {userData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Todos Bar Chart */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Todos Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={todoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Products Line Chart */}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-4">Products Stock Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
