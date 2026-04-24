import React from 'react';
import type { ISubCourseItem } from './types';

interface CourseSubItemProps {
  item: ISubCourseItem;
}

export const CourseSubItem: React.FC<CourseSubItemProps> = ({ item }) => {
  const statusClass = item.status === 'Уже выполнено' ? 'status--done' : 'status--progress';

  return (
    <div className="course-subitem">
      <span className="course-subitem__title">{item.title}</span>
      <div className={`course-subitem__status ${statusClass}`}>
        {item.status}
      </div>
    </div>
  );
};