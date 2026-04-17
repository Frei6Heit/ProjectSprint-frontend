import React, { useState } from 'react';
import type { ICourseItem } from './types.ts';
import { CourseSubItem } from './CourseSubItem';
import './CourseAccordion.scss';

interface CourseAccordionProps {
  course: ICourseItem;
}

export const CourseAccordion: React.FC<CourseAccordionProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="course-accordion">
      <div className="course-accordion__header" onClick={() => setIsOpen(!isOpen)}>
        <div className="course-accordion__icon-title">
          <span className="course-accordnpm installion__icon">{course.icon}</span>
          <h3 className="course-accordion__title">{course.title}</h3>
        </div>

        <div className="course-accordion__progress-wrapper">
          <div className="course-accordion__progress-bar">
            <div 
              className="course-accordion__progress-fill" 
              style={{ width: `${course.progress}%` }} 
            />
          </div>
        </div>

        <div className="course-accordion__controls">
          <span className="course-accordion__percent">{course.progress}%</span>
          <button 
            className={`course-accordion__toggle ${isOpen ? 'course-accordion__toggle--open' : ''}`}
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.41 0.589966L6 5.16997L10.59 0.589966L12 1.99997L6 7.99997L0 1.99997L1.41 0.589966Z" fill="#1A1A1A"/>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && course.subItems.length > 0 && (
        <div className="course-accordion__body">
          {course.subItems.map((subItem) => (
            <CourseSubItem key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};