import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({ title, description, status });
      setTitle(''); 
      setDescription(''); 
      setStatus('To Do');
      setIsFormVisible(false); 
    }
  };

  const handleAddClick = () => {
    setIsFormVisible(true); 
  };

  const handleCancel = () => {
    setIsFormVisible(false); 
  };

  return (
    <div>
      <div className="mb-3">
        {!isFormVisible && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add New Task
          </button>
        )}
      </div>
      
      {isFormVisible && (
        <div className="mt-3">
          <form onSubmit={handleSubmit}>
            <h4>Add New Task</h4>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="d-flex justify-content-start">
              <button type="submit" className="btn btn-success me-2">
                Save Task
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;












