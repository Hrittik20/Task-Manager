import { useEffect, useState } from 'react';
import './App.css';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './utils/localStorage';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = loadFromStorage(STORAGE_KEYS.USER);

    if (savedUser) setUser(savedUser);
  })

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    saveToStorage(STORAGE_KEYS.USER, null);
  };

  if(!user){
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="header-actions">
            <button
              onClick={() => console.log("Dark Mode")}
              className="theme-toggle"
            >
              dark mode
            </button>
            <span className="user-info">Welcome, user!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="task-dashboard">
          <div className="dashboard-header">
            
            <button
              className="add-task-btn"
            >
              Add Task
            </button>
          </div>

          <div className="task-list">
            <h1>TASK LIST</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
