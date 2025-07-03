import { useState } from "react";
import { Edit3, Trash2, Check,Calendar, AlertCircle } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
    
    const [showConfirm, setShowConfirm] = useState(false);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    setShowConfirm(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-main">
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed && <Check size={16} />}
        </button>
        
        <div className="task-content">
          <div className="task-header">
            <h4 className="task-title">{task.title}</h4>
            <div className="task-meta">
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
              <span className="category-badge">{task.category}</span>
            </div>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-footer">
            <div className="task-dates">
              <span className="created-date">
                Created: {formatDate(task.createdAt)}
              </span>
              {task.dueDate && (
                <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                  <Calendar size={14} />
                  Due: {formatDate(task.dueDate)}
                  {isOverdue && <AlertCircle size={14} />}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onEditTask(task)}
          className="edit-btn"
          disabled={task.completed}
        >
          <Edit3 size={16} />
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="delete-btn"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <h4>Delete Task</h4>
            <p>Are you sure you want to delete "{task.title}"?</p>
            <div className="confirm-actions">
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;