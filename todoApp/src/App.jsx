import React,{useState} from 'react'
import './App.css'
import TodosList from './TodosList.jsx';
const App = () => {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const changeHandler = e => {
        setTask(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        setTodos([
            ...todos,
            { text: task, completed: false }
        ]);

        setTask("");
    };

    const toggleComplete = (indexValue) => {
        const updatedTodos = todos.map((todo, index) =>
            index === indexValue
            ? { ...todo, completed: !todo.completed }
            : todo
        );

        setTodos(updatedTodos);
     };



    const deleteHandler = (indexValue) => {
        const filteredTodos = todos.filter((todo, index) => index !== indexValue);
        setTodos(filteredTodos);
    }

  return (
    <div className='app'>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Todo Management Application</h5>


                 <form className="todo-form" onSubmit={submitHandler}>
                    <input
                         type="text" 
                         value={task} 
                         onChange={changeHandler} 
                         placeholder="Enter your task"
                     />
                    <button type="submit" disabled={!task.trim()}>
                        Add
                    </button>
                </form>
                <TodosList
                    todolist={todos}
                    deleteHandler={deleteHandler}
                    toggleComplete={toggleComplete}
                />             
            </div> 
        </div>
    </div>
  )
}

export default App
