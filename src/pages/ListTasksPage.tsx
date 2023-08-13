import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchTasks } from "../services/api";
import { Task } from "../types/TaskType";

const ListTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { _id: "1", name: "React" },
    { _id: "2", name: "Node" },
  ]);

  useEffect(() => {
    async function fetchTasksData() {
      try {
        const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage
        const data = await fetchTasks(token || "");
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasksData();
  }, []);

  return (
    <>
      <div className="text-center">
        <h2>List of Tasks</h2>
      </div>
      <TaskList
        tasks={tasks}
        selectedTaskIds={[]}
        setSelectedTaskIds={() => {}}
        action="Actions"
      />
    </>
  );
};

export default ListTasksPage;
