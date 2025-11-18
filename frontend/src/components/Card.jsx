import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../services/todoServices";

const Card = ({ task, getUserTask, onEdit }) => {
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task deleted");
      getUserTask();
    } catch (error) {
      toast.error("Delete failed", error.message);
    }
  };

  const toggleComplete = async () => {
    try {
      await TodoServices.updateTodo(task._id, {
        title: task.title,
        isCompleted: !task.isCompleted,
      });
      toast.success("Updated");
      getUserTask();
    } catch (error) {
      toast.error("Update failed", error.message);
    }
  };

  return (
    <article className="bg-white/6 backdrop-blur rounded-2xl p-5 border border-white/10 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {task.title}
          </h3>
          <p className="text-sm text-white/70 mt-2 min-h-[40px]">
            {task.description || "—"}
          </p>

          <div className="mt-3 flex items-center gap-3 text-sm text-white/70">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                task.isCompleted
                  ? "bg-green-700/30 text-green-200"
                  : "bg-red-700/30 text-red-200"
              }`}
            >
              {task.isCompleted ? "Completed" : "Incompleted"}
            </span>

            <span className="ml-auto text-xs">
              {task.createdAt?.slice(0, 10)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={toggleComplete}
            title="Toggle complete"
            className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center hover:bg-white/30 transition"
          >
            {task.isCompleted ? "✓" : "○"}
          </button>

          <button
            onClick={onEdit}
            title="Edit"
            className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center hover:bg-white/30 transition"
          >
            ✎
          </button>

          <button
            onClick={() => handleDelete(task._id)}
            title="Delete"
            className="w-9 h-9 rounded-lg bg-white/6 flex items-center justify-center hover:bg-white/30 transition"
          >
            🗑
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
