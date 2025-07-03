export const STORAGE_KEYS = {
  TASKS: 'taskManager_tasks',
  USER: 'taskManager_user',
  THEME: 'taskManager_theme'
};

export const loadFromStorage = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const saveToStorage = (key, data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};