import React, { useState } from 'react';
import { Textarea } from '../Textarea/Textarea';
import './AddReportForm.scss';

export const AddReportForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plans, setPlans] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    plans: '',
    file: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors = {
      title: '',
      description: '',
      plans: '',
      file: '',
    };
    if (!title.trim()) newErrors.title = 'Заголовок обязателен';
    if (!description.trim()) newErrors.description = 'Описание работы обязательно';
    if (!plans.trim()) newErrors.plans = 'Будущие планы обязательны';
    if (!file) newErrors.file = 'Прикрепите файл';
    else if (file.size > 20 * 1024 * 1024) newErrors.file = 'Файл не более 20 МБ';

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (errors.file) setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      console.log('Отправлено:', { title, description, plans, fileName: file?.name });
    }
  };

  if (isSubmitted) {
    return (
      <div className="add-report-form__success">
        <div className="add-report-form__success-icon">✓</div>
        <h3>Отчёт отправлен!</h3>
        <p>Спасибо, ваш отчёт успешно отправлен.</p>
        <button onClick={() => setIsSubmitted(false)} className="add-report-form__reset">
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div className="add-report-form">
      <form onSubmit={handleSubmit}>
        <div className="add-report-form__field">
          <input
            type="text"
            className={`add-report-form__input ${errors.title ? 'add-report-form__input--error' : ''}`}
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="add-report-form__error">{errors.title}</div>}
        </div>

        <Textarea
          label="Описание работы"
          value={description}
          onChange={setDescription}
          placeholder="Напишите интересные факты, основную информацию"
          error={errors.description}
        />

        <Textarea
          label="Будущие планы"
          value={plans}
          onChange={setPlans}
          placeholder="Опишите перспективы отчёта"
          error={errors.plans}
        />

        <div className="add-report-form__file-zone">
          <div className="add-report-form__file-label">Добавить файлы</div>
          <div className="add-report-form__file-area">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".svg,.jpg,.png,.pdf,.docx"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="add-report-form__file-button">
              📎 Нажмите для загрузки файлов
            </label>
            {file && <div className="add-report-form__file-name">📄 {file.name}</div>}
            <div className="add-report-form__file-hint">
              Поддерживаемые форматы: SVG, JPG, PNG, PDF, DOCX (до 20 МБ)
            </div>
          </div>
          {errors.file && <div className="add-report-form__error">{errors.file}</div>}
        </div>

        <button type="submit" className="add-report-form__submit">
          ОТПРАВИТЬ
        </button>
      </form>
    </div>
  );
};