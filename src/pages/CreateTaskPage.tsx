import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createTask } from '../services/api';

const CreateTaskPage: React.FC = () => {
  let history = useHistory();
  const [taskName, setTaskName] = useState('');

  const handleCreateTask = async () => {
    if (taskName.trim() !== '') {
      try {
        const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage
        await createTask(taskName, token || '');
        history.push('/list-tasks');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create New Task</h2>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleCreateTask}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
