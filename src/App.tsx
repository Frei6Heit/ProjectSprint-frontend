<<<<<<< HEAD
import React, { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { AddReportForm } from './components/AddReportForm/AddReportForm';
=======

import React from 'react';
import { FormBlock } from './components/FormBlock/FormBlock';
import './App.css';
>>>>>>> 53f79f8ba7c715d1b326236b086aabca81079d47

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
<<<<<<< HEAD
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <button 
        onClick={() => setIsModalOpen(true)} 
        style={{
          padding: '14px 28px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        �������� �����
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="���������� ������">
        <AddReportForm />
      </Modal>
=======
    <div className="App">
      <FormBlock />


import { CourseAccordion } from './CourseAccordion';
import type { ICourseItem } from './types.ts';

const mockCourses: ICourseItem[] = [
  {
    id: 1,
    title: 'Python',
    icon: 'pt',
    progress: 50,
    subItems: [
      { id: '1-1', title: 'Основы Python', status: 'Уже выполнено' },
      { id: '1-2', title: 'Переменные', status: 'В процессе' },
    ]
  },
  {
    id: 2,
    title: 'HTML',
    icon: 'ht',
    progress: 25,
    subItems: [
      { id: '2-1', title: 'Введение в HTML', status: 'Уже выполнено' },
      { id: '2-2', title: 'Атрибуты', status: 'В процессе' },
      { id: '2-3', title: 'Валидация', status: 'В процессе' },
      { id: '2-4', title: 'Элементы', status: 'В процессе' },
    ]
  }
];

function App() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {mockCourses.map(course => (
          <CourseAccordion key={course.id} course={course} />
        ))}
      </div>
main
>>>>>>> 53f79f8ba7c715d1b326236b086aabca81079d47
    </div>
  );
}


export default App;

export default App;

export default App;

