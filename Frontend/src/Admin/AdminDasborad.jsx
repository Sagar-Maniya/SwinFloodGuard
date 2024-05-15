import React, { useEffect, useState } from 'react';
import TableComponent from './TableComponent';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import './AdminDasborad.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/user/get-all-users'
        );
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [users]);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/user/add-user',
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data.message);
      setNewUser({});
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('The server is not responding. Please try again later.');
      }
    }
  };

  const updateUser = async (id, user) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${id}/update-user`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('The server is not responding. Please try again later.');
      }
    }
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${id}/delete-user`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('The server is not responding. Please try again later.');
      }
    }
  };

  return (
    <div className='admin-dashboard'>
      <AdminHeader />
      <h1>Admin Dashboard</h1>
      <button
        className='add-user-button'
        onClick={() => setShowAddUserForm(true)}
      >
        Add User
      </button>
      <TableComponent
        users={users}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
      {showAddUserForm && (
        <div className='add-user-form'>
          <h2>Add User</h2>
          <input
            type='text'
            placeholder='First Name'
            value={newUser.first_name || ''}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Last Name'
            value={newUser.last_name || ''}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
          />
          <input
            type='email'
            placeholder='Email'
            value={newUser.email || ''}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={addUser}>Submit</button>
          <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
