import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './AddTodo.module.css'; // Import the CSS Module

/**
 * AddTodo Component
 * 
 * A form to add new ToDo items.
 * 
 * Props:
 * - setTodos: Function to update the list of ToDos in the parent component.
 */
function AddTodo({ setTodos }) {
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      return; // Prevent adding empty ToDo
    }
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/todo`,
        { text: todoText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTodoText(''); // Clear input field after adding
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAddTodo}>
      <input
        type="text"
        className={styles.input}
        placeholder="Add a new ToDo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  setTodos: PropTypes.func.isRequired,
};

export default AddTodo;
