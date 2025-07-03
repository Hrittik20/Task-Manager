import { useState } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ onAddTask, onCancel, editingTask, onUpdateTask }) => {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState(editingTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || '');
  const [category, setCategory] = useState(editingTask?.category || 'personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        category
      };

      if (editingTask) {
        onUpdateTask(editingTask.id, taskData);
        onCancel();
      } else {
        onAddTask(taskData);
      }

      if (!editingTask) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setCategory('personal');
      }
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-modal">
        <div className="task-form-header">
          <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
          <button type="button" onClick={onCancel} className="close-btn">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title*</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task description (optional)"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;