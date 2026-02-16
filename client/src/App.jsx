import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/users";

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}?search=${search}`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 404) {
        setUsers([]);
        toast.error("User not found");
      } else {
        toast.error("Error fetching users");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  // Separate users
  const activeUsers = users.filter((u) => u.status === "Active");
  const inactiveUsers = users.filter((u) => u.status === "Inactive");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        toast.success("User updated successfully!");
        setEditId(null);
      } else {
        await axios.post(API, form);
        toast.success("User added successfully!");
      }

      setForm({
        name: "",
        email: "",
        age: "",
        status: "Active",
      });

      fetchUsers();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Edit user
  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age,
      status: user.status,
    });
    setEditId(user._id);
  };

  // Toggle status
  const toggleStatus = async (id) => {
    try {
      await axios.patch(`${API}/${id}/toggle`);
      toast.success("Status updated!");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          User Management System
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editId ? "Update User" : "Add User"}
          </button>
        </form>

        {/* Loading */}
        {loading && <p className="text-blue-500">Loading users...</p>}

        {/* Dashboard Counts */}
        <div className="flex justify-between mb-6">
          <div className="bg-blue-100 p-4 rounded-md w-1/3 text-center">
            <h3 className="font-bold">Total Users</h3>
            <p className="text-xl">{users.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-md w-1/3 text-center mx-2">
            <h3 className="font-bold">Active Users</h3>
            <p className="text-xl">{activeUsers.length}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md w-1/3 text-center">
            <h3 className="font-bold">Inactive Users</h3>
            <p className="text-xl">{inactiveUsers.length}</p>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active */}
          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Active Users
            </h2>

            {activeUsers.map((user) => (
              <div
                key={user._id}
                className="bg-green-50 p-4 rounded-lg shadow-sm mb-3"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">
                  {user.email} | Age: {user.age}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editUser(user)}
                    className="bg-yellow-400 px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md"
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Inactive */}
          <div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Inactive Users
            </h2>

            {inactiveUsers.map((user) => (
              <div
                key={user._id}
                className="bg-red-50 p-4 rounded-lg shadow-sm mb-3"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">
                  {user.email} | Age: {user.age}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editUser(user)}
                    className="bg-yellow-400 px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Activate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
