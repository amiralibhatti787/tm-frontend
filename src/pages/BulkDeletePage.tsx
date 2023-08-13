import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { fetchTasks, deleteTasks } from "../services/api";
import { Task } from "../types/TaskType";

const BulkDeletePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: "1", name: "React" },
    { _id: "2", name: "Node" },
  ]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTasksData() {
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetchTasks(token || "");
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasksData();
  }, []);

  const handleDeleteSelected = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await deleteTasks(selectedTaskIds, token || "");
      const updatedTasks = tasks.filter(
        (task) => !selectedTaskIds.includes(task._id)
      );
      setTasks(updatedTasks);
      setSelectedTaskIds([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };
  console.log("selectedTaskIds", selectedTaskIds);
  return (
    <div className="container mt-5">
      <h2 className="mb-3">Bulk Delete Tasks</h2>
      <TaskList
        tasks={tasks}
        selectedTaskIds={selectedTaskIds}
        setSelectedTaskIds={setSelectedTaskIds}
        action="Select"
      />

      <div className="d-grid gap-2">
        <button className="btn btn-danger" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default BulkDeletePage;
