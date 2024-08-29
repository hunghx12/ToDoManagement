import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css'; // Import the CSS Module

/**
 * TodoList Component
 * 
 * Renders a list of ToDo items.
 * 
 * Props:
 * - todos: Array of ToDo objects.
 * - setTodos: Function to update the list of ToDos in the parent component.
 */
function TodoList({ todos, setTodos }) {
  if (todos.length === 0) {
    return <p className={styles.emptyMessage}>No ToDos available. Add one!</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default TodoList;
