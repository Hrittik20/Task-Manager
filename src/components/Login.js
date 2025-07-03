import { useState } from "react";
import { saveToStorage, STORAGE_KEYS } from "../utils/localStorage";

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
        saveToStorage(STORAGE_KEYS.USER, username.trim());
        onLogin(username.trim());
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                <h1>Task Manager</h1>
                <p>Welcome back! Please sign in to continue.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    />
                </div>
                
                <button type="submit" className="login-btn">
                    Sign In
                </button>
                </form>
            </div>
        </div>
  );
};

export default Login;