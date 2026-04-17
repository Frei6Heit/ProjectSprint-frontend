import React from 'react';

export type ProgressStatus = 'Уже выполнено' | 'В процессе';

export interface ISubCourseItem {
  id: string | number;
  title: string;
  status: ProgressStatus;
}

export interface ICourseItem {
  id: string | number;
  title: string;
  icon: React.ReactNode; 
  progress: number;
  subItems: ISubCourseItem[];
}