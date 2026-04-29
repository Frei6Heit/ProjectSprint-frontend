import React, { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import { AddReportForm } from './components/AddReportForm/AddReportForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
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
        Добавить отчёт
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Добавление отчёта">
        <AddReportForm />
      </Modal>
    </div>
  );
}

export default App;