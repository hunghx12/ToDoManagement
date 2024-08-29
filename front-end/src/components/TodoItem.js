import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './TodoItem.module.css'; // Import the CSS Module

function TodoItem({ todo, setTodos }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = localStorage.getItem('token');

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/todo/${todo.id}`,
        updatedTodo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      toast.success(
        `Todo marked as ${response.data.completed ? 'completed' : 'incomplete'}`
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update the todo. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/todo/${todo.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
      toast.success('Todo deleted successfully.');
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete the todo. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className={styles.listItem}>
      <span
        className={`
          ${styles.todoText} 
          ${todo.completed ? styles.completed : ''}
        `}
      >
        {todo.text}
      </span>
      <div className={styles.buttonsContainer}>
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating || isDeleting}
          className={styles.button}
        >
          {isUpdating
            ? 'Updating...'
            : todo.completed
            ? 'Undo'
            : 'Complete'}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
          className={`${styles.button} ${styles.deleteButton}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoItem;
