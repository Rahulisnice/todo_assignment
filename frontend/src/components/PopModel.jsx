import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../services/todoServices";

const PopModel = ({ showModel, setShowModel, task, getUserTask }) => {
  const [title, setTitle] = useState("");
  const [description] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
    } else {
      setTitle("");
    }
  }, [task]);

  const close = () => setShowModel(false);

  const handleCreate = async () => {
    if (!title.trim()) return toast.error("Please provide title");
    setLoading(true);
    try {
      await TodoServices.createTodo({ title });
      toast.success("Task created");
      getUserTask();
      close();
    } catch (err) {
      toast.error("Create failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) return toast.error("Please provide title");
    setLoading(true);
    try {
      await TodoServices.updateTodo(task._id, {
        title,
        isCompleted: task.isCompleted,
      });
      toast.success("Task updated");
      getUserTask();
      close();
    } catch (err) {
      toast.error("Update failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showModel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg bg-white/6 backdrop-blur rounded-2xl p-6 border border-white/10">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {task ? "Edit Task" : "Create Task"}
          </h3>
          <button onClick={close} className="text-white/80">
            ✕
          </button>
        </header>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/80">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Description</label>
            <textarea
              value={description}
              readOnly
              placeholder="(No description supported by the sample API)"
              className="w-full mt-2 px-4 py-2 rounded-lg bg-white/6 text-white/70 resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={close}
              className="px-4 py-2 rounded-lg bg-white/6 text-white"
            >
              Cancel
            </button>

            {task ? (
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopModel;
