import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PopModel from "../components/PopModel";
import TodoServices from "../services/todoServices";
import Card from "../components/Card";
import toast from "react-hot-toast";

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [allTask, setAllTask] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setEditTask(null);
    setShowModel(true);
  };

  const openEdit = (task) => {
    setEditTask(task);
    setShowModel(true);
  };

  const getUserTask = async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo();
      setAllTask(data?.todos || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // derived filtered list
  const filtered = allTask.filter((t) =>
    t.title?.toLowerCase().includes(searchQuery.trim().toLowerCase() || "")
  );

  return (
    <>
      <div
        className="min-h-screen bg-[url('https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg')] bg-cover bg-center"
        style={{ backgroundAttachment: "fixed" }}
      >
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <section className="backdrop-blur-sm bg-white/30 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-400">
                  Your Tasks
                </h1>
                <p className="text-sm text-black/80 mt-1">
                  A shared list for all users — quick, clean, and sync-friendly.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex-1 min-w-0">
                  <input
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search tasks..."
                    className="w-full px-4 py-2 rounded-xl bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-[1.02] transform transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* GRID */}
          <section className="mt-8">
            {loading ? (
              <div className="text-center py-20 text-white/80">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-white/80">
                No tasks found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((task) => (
                  <Card
                    key={task._id}
                    task={task}
                    getUserTask={getUserTask}
                    onEdit={() => openEdit(task)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* floating refresh / create FAB */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={getUserTask}
            className="w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg hover:scale-105 transition"
            title="Refresh"
          >
            ⟳
          </button>
          <button
            onClick={openCreate}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition transform"
            title="Add Task"
          >
            +
          </button>
        </div>

        {/* modal (create / edit) */}
        <PopModel
          showModel={showModel}
          setShowModel={setShowModel}
          task={editTask}
          getUserTask={getUserTask}
        />
      </div>
    </>
  );
};

export default Home;
