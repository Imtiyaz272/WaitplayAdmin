import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./AdminPage.css";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/superadmin")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      fetch(`/api/admins/${id}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setAdmins(admins.filter((admin) => admin._id !== id));
            alert("Admin deleted successfully.");
          } else {
            alert("Failed to delete admin.");
          }
        })
        .catch((error) => console.error("Error deleting admin:", error));
    }
  };

  const handleEdit = (id) => {
    alert(`Redirect to edit admin with ID: ${id}`);
  };

  return (
    <div className="admin-page">
      <h1>Admins List</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Restaurant Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phoneNumber}</td>
              <td>{admin.restaurant_name}</td>
              <td className="admindetailsaction">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(admin._id)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(admin._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
