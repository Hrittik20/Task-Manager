import { Search } from 'lucide-react';

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts, searchTerm, onSearchChange }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="task-filter">
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
            <span className="count">{filter.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;