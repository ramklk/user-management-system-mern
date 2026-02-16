import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/users";

  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age
    });
    setEditId(user._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          User Management System
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editId ? "Update User" : "Add User"}
          </button>
        </form>

        {/* User List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Users</h2>

          {users.length === 0 && (
            <p className="text-gray-500">No users found.</p>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-3"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">
                  {user.email} | Age: {user.age}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editUser(user)}
                  className="bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
