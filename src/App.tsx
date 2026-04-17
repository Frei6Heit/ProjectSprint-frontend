
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
    </div>
  );
}

export default App;

export default App;
