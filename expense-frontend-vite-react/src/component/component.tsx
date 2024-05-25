import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "./taskCard";
interface Task {
  id?: number;
  title: string;
  dueDate: string;
  status: string;
  description: string;
  createdAt: string;
  onTaskUpdate?: () => void;
}
export default function Component() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask: Task) => {
    try {
      await axios.post("http://localhost:3000/api/tasks", newTask);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "Today") {
      const [day, month, year] = task.dueDate.split("-");
      const convertedDate = `${year}-${month}-${day}`;

      return Math.ceil(
        (new Date(convertedDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      ).toString() == "0";

      
    }
    return true;
  });

  const handleAddTaskClick = () => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter task description:");
    const dueDate = prompt("Enter task due date (DD-MM-YYYY):");

    const newTask: Task = {
      title: title ? title : "",
      description: description ? description : "",
      status: "Pending",
      dueDate: dueDate ? dueDate : "",
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden w-64 shrink-0 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950 md:block">
        <div className="flex h-full flex-col justify-between py-6">
          <nav className="space-y-2 px-4">
            <a
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                filter === "All"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setFilter("All")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-5 w-5"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
              All Tasks
            </a>
            <a
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                filter === "Today"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setFilter("Today")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-5 w-5"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Today
            </a>
          </nav>
          <div className="px-4">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm text-gray-300 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full"
              onClick={handleAddTaskClick}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{filter} Tasks</h1>
          </div>
          <div className="grid gap-4">
            {filteredTasks.map((task: Task) => {
              if (task.id) {
                return (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    dueDate={task.dueDate}
                    status={task.status}
                    description={task.description}
                    createdAt={task.createdAt}
                    onTaskUpdate={fetchTasks}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
