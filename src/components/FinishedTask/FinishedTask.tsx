import React, { useState } from 'react';
import './task_style.scss';


interface TaskCardData {
  title: string;
  description: string;
  progress: number;
  hasHash?: boolean;
  commentsCount?: number;
  daysLeft?: number;
}


const CompletedBadge: React.FC = () => {
  return (
    <div className="task-card">
      <div className="task-inner" style={{ padding: '1.4rem 1.6rem' }}>
        <div className="badge-solo">
          <span className="circle-icon">⊚</span>
          <span className="badge-text">Выполненные задачи</span>
        </div>
      </div>
    </div>
  );
};

interface ThreeDotsMenuProps {
  onMenuClick?: () => void;
}

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({ onMenuClick }) => {
  return (
    <button className="three-dots" aria-label="Меню задачи" onClick={onMenuClick}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </button>
  );
};


interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="progress-block">
      <div className="progress-header">Прогресс</div>
      <div className="progress-row">
        <div className="progress-bar-wrapper">
          <div className="progress-bar-bg">
            <div className="progress-fill" style={{ width: `${clampedProgress}%` }}></div>
          </div>
        </div>
        <div className="percentage-value">{clampedProgress}%</div>
      </div>
    </div>
  );
};


interface MetricsFooterProps {
  hasHash?: boolean;
  commentsCount?: number;
  daysLeft?: number;
}

const MetricsFooter: React.FC<MetricsFooterProps> = ({ 
  hasHash = true, 
  commentsCount = 10, 
  daysLeft = 2 
}) => {
  return (
    <div className="metrics-footer">
      <div className="left-metrics">
        {hasHash && (
          <div className="metric-chip">
            <span className="hash-symbol">#</span>
          </div>
        )}
        
        {commentsCount !== undefined && commentsCount > 0 && (
          <div className="metric-chip">
            <svg className="metric-icon-svg" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="metric-number">{commentsCount}</span>
            <span className="metric-label">обсуждений</span>
          </div>
        )}
      </div>
      
      <div className="right-metrics">
        {daysLeft !== undefined && daysLeft > 0 && (
          <div className="days-chip">
            <span className="metric-number">{daysLeft}</span>
            <span className="metric-label">дня</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  data: TaskCardData;
  onMenuClick?: () => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  data, 
  onMenuClick, 
  className = '' 
}) => {
  const {
    title,
    description,
    progress,
    hasHash = true,
    commentsCount = 10,
    daysLeft = 2
  } = data;

  return (
    <div className={`task-card ${className}`}>
      <div className="task-inner">
        <div className="card-header-row">
          <h2 className="task-title">{title}</h2>
          <ThreeDotsMenu onMenuClick={onMenuClick} />
        </div>

        <div className="task-description">
          {description}
        </div>

        <ProgressBar progress={progress} />
        
        <MetricsFooter 
          hasHash={hasHash}
          commentsCount={commentsCount}
          daysLeft={daysLeft}
        />
      </div>
    </div>
  );
};

interface TasksWidgetProps {
  mainTaskData?: TaskCardData;
  onMainTaskMenuClick?: () => void;
}

const TasksWidget: React.FC<TasksWidgetProps> = ({
  mainTaskData = {
    title: 'Заголовок',
    description: 'Составить план проекта и обсудить его с командой, распределить этапы работ.',
    progress: 100,
    hasHash: true,
    commentsCount: 10,
    daysLeft: 2
  },
  onMainTaskMenuClick
}) => {
  return (
    <div className="cards-stack">
      <CompletedBadge />
      <TaskCard data={mainTaskData} onMenuClick={onMainTaskMenuClick} />
    </div>
  );
};

export default TasksWidget;
export { TaskCard, CompletedBadge, ThreeDotsMenu, ProgressBar, MetricsFooter };
export type { TaskCardData };
