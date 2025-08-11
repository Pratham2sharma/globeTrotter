import React from "react";
import { motion } from "framer-motion";

interface ManageUsersProps {
  search: string;
  sort: string;
}

const ManageUsers: React.FC<ManageUsersProps> = ({ search, sort }) => {
  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "pending" },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "active",
    },
  ];

  return (
    <motion.section
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">Manage Users</h2>
        <p className="text-gray-600 mt-1">Total Users: {dummyUsers.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50">
            {dummyUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-teal-600 hover:text-teal-800 font-medium"
                  >
                    Edit
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <p className="text-sm text-gray-500">
          Showing {dummyUsers.length} users • Filtered by: {search} • Sorted by:{" "}
          {sort}
        </p>
      </div>
    </motion.section>
  );
};

export default ManageUsers;
