// TableComponent.jsx

import React, { useState } from 'react';
import './TableComponent.css';

const TableComponent = ({ users, updateUser, deleteUser }) => {
  const [editingId, setEditingId] = useState(0);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (id, user) => {
    setEditingId(id);
    setEditedData(user);
  };

  const handleSave = (e, id) => {
    e.preventDefault();
    updateUser(id, editedData);
    setEditingId(0);
  };

  const handleCancel = () => {
    setEditingId(0);
    setEditedData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const toggleIsVerified = () => {
    setEditedData({ ...editedData, is_verified: !editedData.is_verified });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Is Verified</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              {editingId === user.id ? (
                <input
                  type='text'
                  name='first_name'
                  value={editedData.first_name || ''}
                  onChange={handleChange}
                />
              ) : (
                user.first_name
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type='text'
                  name='last_name'
                  value={editedData.last_name || ''}
                  onChange={handleChange}
                />
              ) : (
                user.last_name
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type='email'
                  name='email'
                  value={editedData.email || ''}
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <button onClick={toggleIsVerified}>
                  {editedData.is_verified ? 'Yes' : 'No'}
                </button>
              ) : user.is_verified ? (
                'Yes'
              ) : (
                'No'
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <>
                  <button onClick={(e) => handleSave(e, user.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEdit(user.id, user)}>Edit</button>
              )}
              <button onClick={(e) => deleteUser(e, user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
