const server = Bun.serve({
    port: 3000,
    fetch() {
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Project Sprint - Отчёты</title>
                <meta charset="UTF-8">
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: Arial, sans-serif; background: #f0f2f5; }
                    #root { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                    button { padding: 14px 28px; font-size: 18px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; }
                    button:hover { background: #0056b3; }
                    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
                    .modal { background: white; border-radius: 16px; width: 90%; max-width: 500px; padding: 24px; position: relative; }
                    .modal-close { position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; }
                    .modal-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; }
                    .form-group { margin-bottom: 15px; }
                    label { display: block; margin-bottom: 5px; font-weight: 500; }
                    input, textarea { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; }
                    .error { color: red; font-size: 12px; margin-top: 5px; }
                    .submit-btn { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px; }
                    .success { text-align: center; padding: 20px; }
                </style>
            </head>
            <body>
                <div id="root"></div>

                <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
                
                <script>
                    const { useState } = React;

                    function App() {
                        const [isOpen, setIsOpen] = useState(false);
                        const [title, setTitle] = useState('');
                        const [description, setDescription] = useState('');
                        const [plans, setPlans] = useState('');
                        const [file, setFile] = useState(null);
                        const [errors, setErrors] = useState({});
                        const [submitted, setSubmitted] = useState(false);

                        const validate = () => {
                            const newErrors = {};
                            if (!title) newErrors.title = 'Заголовок обязателен';
                            if (!description) newErrors.description = 'Описание работы обязательно';
                            if (!plans) newErrors.plans = 'Будущие планы обязательны';
                            if (!file) newErrors.file = 'Прикрепите файл';
                            setErrors(newErrors);
                            return Object.keys(newErrors).length === 0;
                        };

                        const handleSubmit = () => {
                            if (validate()) {
                                setSubmitted(true);
                                console.log('Отправлено:', { title, description, plans, fileName: file?.name });
                            }
                        };

                        if (submitted) {
                            return React.createElement('div', { className: 'success' },
                                React.createElement('h3', {}, '✅ Отчёт отправлен!'),
                                React.createElement('button', { onClick: () => { setSubmitted(false); setTitle(''); setDescription(''); setPlans(''); setFile(null); }, style: { marginTop: '15px', padding: '8px 20px' } }, 'Отправить ещё')
                            );
                        }

                        return React.createElement('div', null,
                            React.createElement('button', { onClick: () => setIsOpen(true) }, 'Добавить отчёт'),
                            isOpen && React.createElement('div', { className: 'modal-overlay', onClick: () => setIsOpen(false) },
                                React.createElement('div', { className: 'modal', onClick: (e) => e.stopPropagation() },
                                    React.createElement('button', { className: 'modal-close', onClick: () => setIsOpen(false) }, '✕'),
                                    React.createElement('div', { className: 'modal-title' }, 'Добавление отчёта'),
                                    
                                    React.createElement('div', { className: 'form-group' },
                                        React.createElement('input', { type: 'text', placeholder: 'Заголовок', value: title, onChange: (e) => setTitle(e.target.value) }),
                                        errors.title && React.createElement('div', { className: 'error' }, errors.title)
                                    ),
                                    
                                    React.createElement('div', { className: 'form-group' },
                                        React.createElement('label', {}, 'Описание работы'),
                                        React.createElement('textarea', { value: description, onChange: (e) => setDescription(e.target.value), rows: 3, placeholder: 'Напишите интересные факты, основную информацию' }),
                                        errors.description && React.createElement('div', { className: 'error' }, errors.description)
                                    ),
                                    
                                    React.createElement('div', { className: 'form-group' },
                                        React.createElement('label', {}, 'Будущие планы'),
                                        React.createElement('textarea', { value: plans, onChange: (e) => setPlans(e.target.value), rows: 3, placeholder: 'Опишите перспективы отчёта' }),
                                        errors.plans && React.createElement('div', { className: 'error' }, errors.plans)
                                    ),
                                    
                                    React.createElement('div', { className: 'form-group' },
                                        React.createElement('label', {}, 'Добавить файлы'),
                                        React.createElement('input', { type: 'file', onChange: (e) => setFile(e.target.files[0]), accept: '.svg,.jpg,.png,.pdf,.docx' }),
                                        errors.file && React.createElement('div', { className: 'error' }, errors.file),
                                        React.createElement('div', { style: { fontSize: '11px', color: '#888', marginTop: '5px' } }, 'Поддерживаемые форматы: SVG, JPG, PNG, PDF, DOCX (до 20 МБ)')
                                    ),
                                    
                                    React.createElement('button', { className: 'submit-btn', onClick: handleSubmit }, 'ОТПРАВИТЬ')
                                )
                            )
                        );
                    }

                    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
                </script>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
});

console.log(`Сервер запущен на http://localhost:${server.port}`);