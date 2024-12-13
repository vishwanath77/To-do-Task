import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const initialTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: '',
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(initialTasks);
      });
  }, []);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, ...newTask },
    ]);
    toast.success('Task added successfully!'); 
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast.success('Task updated successfully!'); 
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success('Task deleted successfully!'); 
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) => filter === 'All' || task.status === filter
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>
      <div className="d-flex justify-content-between">
     
        <div className="mb-4" style={{ width: '40%' }}>
          <label htmlFor="statusFilter" className="form-label">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="form-select"
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>    
      <TaskTable
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <div>
        <AddTaskForm addTask={addTask} />
      </div>
      <ToastContainer    position="top-center"
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
         />
    </div>
  );
};

export default App;
