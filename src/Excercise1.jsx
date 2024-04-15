import './Excercise1.css'

import React, {useEffect, useState} from "react";

import axios from "axios";

const Excercise1=()=> {
    const [data, setData] = useState([]);
    const [todo, setTodo] = useState('');

    const handleChange=(e)=> {
        setTodo(e.target.value)
    }

    useEffect(()=> {
        fetchData();
    },[])
    const fetchData=async()=> {
        try{
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
            const data = res.data
            setData(data)

        } catch(error) {
            console.error("Fetch data error", error)
        }
    }

    const submitForm=async(e)=> {
        e.preventDefault();
        try{
            const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
                title: todo,
                completed: false
            })
            alert(`Add task successfull.Status! ${response.status}`);
            setTodo('')
            fetchData();
        } catch(error) {
            console.error("Poast data error", error);
            alert("Fail from add task, please try again")
        }
    }
    return (
        <div className="container">
            <h1>Todo List</h1>
            <form onSubmit={submitForm} className="container-form">
                <input type="text" name='todo' value={todo} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <table className="container-table">
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=> 
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>

    )
}
export default Excercise1;

// ========================= RESOURCE CONSULT FROM CHAT GPT ===========================

// import React, { useEffect, useState } from 'react';

// import axios from 'axios';

// function Excercise1() {
//   const [todos, setTodos] = useState([]);
//   const [taskInput, setTaskInput] = useState('');

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
//       setTodos(response.data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
//         title: taskInput,
//         completed: false,
//       });
//       alert('Todo added successfully');
//       setTaskInput('');
//       fetchTodos(); // Refresh the todo list
//     } catch (error) {
//       console.error('Error adding todo:', error);
//       alert('Failed to add todo');
//     }
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter task"
//           value={taskInput}
//           onChange={(e) => setTaskInput(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Excercise1;
