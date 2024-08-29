import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error("You haven't logged in yet.");
      navigate('/');
      return;
    }

    // Fetch todos if the user is logged in
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/todo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Token error or expired. Please log in again.");
          localStorage.removeItem('token');
          navigate('/');
        } else {
          console.error('Error fetching todos:', error);
          toast.error('Failed to load todos. Please try again later.');
        }
      }
    };

    fetchTodos();
  }, [navigate]);

  return (
    <div>
      <h2>Your ToDos</h2>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoPage;
