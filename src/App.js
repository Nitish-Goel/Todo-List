import { useState } from 'react';
import './App.css';

function App() {
  const [newItem, setnewItem] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title: newItem, completed: false
        },
      ]
    })
    setnewItem("");
  }

  function toggleToDo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo;
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor="item">New item</label>
          <input type="text" id='item' value={newItem} onChange={e => setnewItem(e.target.value)} />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className='header'>ToDo List</h1>

      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
          return (
            <li key={todo.id} >
              <label>
                <input type='checkbox' checked={todo.completed} onChange={e => toggleToDo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)} >Delete</button>
            </li>
          )
        })}
      </ul>

    </div>
  );
}

export default App;
