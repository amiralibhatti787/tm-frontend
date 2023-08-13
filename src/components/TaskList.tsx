import React from "react";
import Card from "./Card";
import { updateTask } from "../services/api";

interface Task {
  name: string;
  _id: string;
}

interface TaskListProps {
  tasks: Task[];
  selectedTaskIds: string[];
  setSelectedTaskIds: (ids: string[]) => void;
  action: string;
  onUpdate?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTaskIds,
  setSelectedTaskIds,
  action,
  onUpdate,
  onDelete,
}) => {
  const token = localStorage.getItem("authToken") || "";
  const handleCheckboxChange = (taskId: string) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId));
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };

  return (
    <div className="container mt-3">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Task Name</th>
            <th scope="col">{action === "Actions" ? "Actions" : "Select"}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <th scope="row">{task._id}</th>
              <td>
                <Card name={task.name} />
              </td>
              <td>
                {action === "Actions" ? (
                  <>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => updateTask(task._id, token, task)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      // onClick={() => onDelete?.(task._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedTaskIds.includes(task._id)}
                      onChange={() => handleCheckboxChange(task._id)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
