import { useEffect, useState } from 'react';
import { Plus, Moon, Sun, Filter } from 'lucide-react';

import './styles/App.css';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/localStorage';
import Login from './components/Login';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';

const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application with all required features",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z",
    priority: "high",
    category: "work",
    dueDate: "2024-07-05"
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features including arrow functions, destructuring, and async/await",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z",
    priority: "medium",
    category: "personal",
    dueDate: ""
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEYS.TASKS)
    return Array.isArray(stored) && stored.length > 0
      ? stored
      : sampleTasks
  })
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedUser = loadFromStorage(STORAGE_KEYS.USER);
    const savedTasks = loadFromStorage(STORAGE_KEYS.TASKS);
    const savedTheme = loadFromStorage(STORAGE_KEYS.THEME);
    
    if (savedUser) setUser(savedUser);
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      setTasks(sampleTasks);
    }
    if (savedTheme) setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    saveToStorage(STORAGE_KEYS.THEME, darkMode);
  }, [darkMode]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    saveToStorage(STORAGE_KEYS.USER, null);
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskId, taskData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...taskData } : task
    ));
    setEditingTask(null);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    if (filter === 'completed') {
      filtered = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = tasks.filter(task => !task.completed);
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getTaskCounts = () => ({
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  });

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="header-actions">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span className="user-info">Welcome, {user}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="task-dashboard">
          <div className="dashboard-header">
            <TaskFilter
              activeFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <button
              onClick={() => setShowTaskForm(true)}
              className="add-task-btn"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <Filter size={48} />
                <h3>No tasks found</h3>
                <p>
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : filter === 'all'
                    ? 'Add your first task to get started'
                    : `No ${filter} tasks yet`}
                </p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          onAddTask={handleAddTask}
          onCancel={handleCloseForm}
          editingTask={editingTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
}

export default App;
