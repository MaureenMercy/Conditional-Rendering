import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  return (
    <div>
      <h1>Todo List</h1>
      
      {/* Conditional rendering based on list emptiness */}
      {todos.length === 0 ? (
        <p>Your todo list is empty. Add some tasks!</p>
      ) : (
        <>
          <ul>
            {filteredTodos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                {/* Conditional rendering of task text style */}
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
          
          {/* Conditional rendering of completed tasks toggle */}
          {todos.some(todo => todo.completed) && (
            <button onClick={() => setShowCompleted(!showCompleted)}>
              {showCompleted ? 'Hide' : 'Show'} Completed Tasks
            </button>
          )}
        </>
      )}

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;