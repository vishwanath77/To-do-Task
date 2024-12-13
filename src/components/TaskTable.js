
import React, { useState } from 'react';


const TaskTable = ({ tasks, updateTask, deleteTask }) => {
 
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEditChange = (e, field) => {
    setEditedTask({
      ...editedTask,
      [field]: e.target.value,
    });
  };

  const handleSave = (taskId) => {
    updateTask({ ...editedTask, id: taskId });
    setEditingTaskId(null); 
    
  };

  const handleCancel = () => {
    setEditingTaskId(null); 
    setEditedTask({});
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.title || task.title}
                    onChange={(e) => handleEditChange(e, 'title')}
                  />
                ) : (
                  task.title
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.description || task.description}
                    onChange={(e) => handleEditChange(e, 'description')}
                  />
                ) : (
                  task.description
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <select
                    value={editedTask.status || task.status}
                    onChange={(e) => handleEditChange(e, 'status')}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td>
                {editingTaskId === task.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSave(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedTask(task);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
