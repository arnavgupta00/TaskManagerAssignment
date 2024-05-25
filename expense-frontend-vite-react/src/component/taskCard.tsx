import { Pen, RefreshCcw, ShieldAlert, Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";

interface TaskCardProps {
  id: number;
  title: string;
  dueDate: string;
  status: string;
  description: string;
  createdAt: string;
  onTaskUpdate: () => void;
}

export default function TaskCard({
  id,
  title,
  dueDate,
  status,
  description,
  onTaskUpdate,
  createdAt,
}: TaskCardProps) {
  const [taskStatus, setTaskStatus] = useState(status);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      onTaskUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    const newTitle = prompt("Enter new title:", title);
    const newDescription = prompt("Enter new description:", description);
    const newDueDate = prompt("Enter new due date (YYYY-MM-DD):", dueDate);

    if (newTitle !== null && newDescription !== null && newDueDate !== null) {
      const newTask = {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        status: taskStatus,
        createdAt: createdAt,
      };

      updateTask(newTask);
    }
  };

  const updateTask = async (updatedTask: any) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedTask);
      onTaskUpdate();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleStatus = async (statusUpdate: string) => {
    const newStatus = statusUpdate;
    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`, {
        title: title ? title : "",
        description: description ? description : "",
        status: newStatus,
        dueDate: dueDate ? dueDate : "",
        createdAt: createdAt,
      });
      setTaskStatus(newStatus);
      onTaskUpdate();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  function dateFormat(dueDate: string): any {
    try {
      const [day, month, year] = dueDate.split("-");
      const convertedDate = `${year}-${month}-${day}`;

      return Math.ceil(
        (new Date(convertedDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      ).toString();
    } catch (error) {
      console.error("Error converting date:", error);
    }
  }
  return (
    <div className="grid gap-2 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={taskStatus === "Completed" ? true : false}
          className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
          onChange={() => {
            toggleStatus("Completed");
          }}
        />
       
        <div className="flex-1">
          <h3 className="font-medium text-gray-200">{title}</h3>
          <h5 className="font-small text-gray-500">{description}</h5>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>Due in {dateFormat(dueDate)} days</span>
          </div>
        </div>

        <div className="status">
          {taskStatus === "In Progress" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              In Progress
            </span>
          )}
          {taskStatus === "Completed" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completed
            </span>
          )}
          {taskStatus === "Pending" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Pending
            </span>
          )}
        </div>

        <div className="flex-shrink-0">
          <div className="flex flex-row justify-center items-center gap-4">
            <RefreshCcw
              className="text-white hover:text-gray-700"
              onClick={() => toggleStatus("In Progress")}
            />

            <ShieldAlert
              className="text-white hover:text-gray-700"
              onClick={() => toggleStatus("Pending")}
            />

            <Pen
              className="text-white hover:text-gray-700"
              onClick={handleEdit}
            />
            <Trash
              className="text-white hover:text-gray-700"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
