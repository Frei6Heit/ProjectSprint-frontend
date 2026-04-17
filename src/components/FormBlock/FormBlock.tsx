import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';
import { TasksList } from '../TasksList/TasksList';
import './FormBlock.scss';

const demoData = {
  title: 'Разработка дашборда аналитики',
  problem: 'Отсутствует единое окно для просмотра ключевых метрик бизнеса',
  expectedResult: 'Создан удобный дашборд с графиками и фильтрами',
  goal: 'Ускорить принятие управленческих решений',
  relevance: 'Актуально для всех отделов компании',
  tasks: ['Собрать требования', 'Спроектировать интерфейс', 'Разработать бэкенд', 'Протестировать'],
};

export const FormBlock: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    problem: '',
    expectedResult: '',
    goal: '',
    relevance: '',
    tasks: [''],
  });
  const [savedData, setSavedData] = useState<any>(null);

  const loadDemoData = () => {
    setFormData({
      title: demoData.title,
      problem: demoData.problem,
      expectedResult: demoData.expectedResult,
      goal: demoData.goal,
      relevance: demoData.relevance,
      tasks: demoData.tasks,
    });
  };

  const clearForm = () => {
    setFormData({
      title: '',
      problem: '',
      expectedResult: '',
      goal: '',
      relevance: '',
      tasks: [''],
    });
  };

  const handleSave = () => {
    setSavedData(formData);
    console.log('Сохранённые данные:', formData);
    alert('Данные сохранены! Смотрите консоль (F12)');
  };

  return (
    <div className="form-block">
      <div className="form-block__controls">
        <button type="button" onClick={clearForm}>
          Вариант 1 (пустые поля)
        </button>
        <button type="button" onClick={loadDemoData}>
          Вариант 2 (заполненные поля)
        </button>
      </div>

      <form className="form-block__form">
        <TextField
          label="Название"
          value={formData.title}
          onChange={(v) => setFormData({ ...formData, title: v })}
          maxLength={100}
          rows={1}
        />

        <TextField
          label="Проблематика"
          value={formData.problem}
          onChange={(v) => setFormData({ ...formData, problem: v })}
          maxLength={1000}
          rows={4}
        />

        <TextField
          label="Ожидаемый продуктовый результат"
          value={formData.expectedResult}
          onChange={(v) => setFormData({ ...formData, expectedResult: v })}
          maxLength={1000}
          rows={4}
        />

        <TextField
          label="Цель"
          value={formData.goal}
          onChange={(v) => setFormData({ ...formData, goal: v })}
          maxLength={1500}
          rows={5}
        />

        <TextField
          label="Актуальность"
          value={formData.relevance}
          onChange={(v) => setFormData({ ...formData, relevance: v })}
          maxLength={1500}
          rows={5}
        />

        <TasksList
          tasks={formData.tasks}
          onTasksChange={(tasks) => setFormData({ ...formData, tasks })}
        />

        <button type="button" onClick={handleSave}>
          Добавить
        </button>
      </form>

      {savedData && (
        <pre className="form-block__debug">
          {JSON.stringify(savedData, null, 2)}
        </pre>
      )}
    </div>
  );
};