import React from 'react';
import './TasksList.scss';

interface TasksListProps {
  tasks: string[];
  onTasksChange: (tasks: string[]) => void;
}

export const TasksList: React.FC<TasksListProps> = ({ tasks, onTasksChange }) => {
  const addTask = () => {
    onTasksChange([...tasks, '']);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    onTasksChange(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    onTasksChange(newTasks);
  };

  return (
    <div className="tasks-list">
      <label className="tasks-list__label">Ключевые задачи</label>
      {tasks.map((task, index) => (
        <div key={index} className="tasks-list__item">
          <textarea
            className="tasks-list__input"
            value={task}
            onChange={(e) => updateTask(index, e.target.value)}
            maxLength={500}
            rows={2}
            placeholder={`Задача ${index + 1}`}
          />
          <button
            type="button"
            className="tasks-list__remove"
            onClick={() => removeTask(index)}
          >
            🗑️
          </button>
        </div>
      ))}
      <button type="button" className="tasks-list__add" onClick={addTask}>
        + Добавить задачу
      </button>
    </div>
  );
};