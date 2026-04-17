import React, { useState, useRef, useEffect } from 'react';
import './style_for_data.scss';

interface DayCell {
    date: Date;
    day: number;
    isCurrent: boolean;
    selected: boolean;
}

const DatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentYear, setCurrentYear] = useState<number>(2026);
    const [currentMonth, setCurrentMonth] = useState<number>(2); // 2 = март (0-индекс)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dateFieldRef = useRef<HTMLDivElement>(null);

    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    const formatDateDMY = (date: Date | null): string => {
        if (!date) return '';
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const isSameDate = (d1: Date | null, d2: Date | null): boolean => {
        if (!d1 || !d2) return false;
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const closeDropdown = (): void => {
        setIsDropdownOpen(false);
    };

    const openDropdown = (): void => {
        if (selectedDate) {
            setCurrentYear(selectedDate.getFullYear());
            setCurrentMonth(selectedDate.getMonth());
        }
        setIsDropdownOpen(true);
    };

    const toggleDropdown = (): void => {
        if (isDropdownOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    const pickDate = (dateObj: Date): void => {
        const newDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        setSelectedDate(newDate);
        closeDropdown();
    };

    const resetDate = (): void => {
        if (selectedDate !== null) {
            setSelectedDate(null);
            closeDropdown();
        }
    };

    const goPrevMonth = (): void => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const goNextMonth = (): void => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const setTodayDate = (): void => {
        const today = new Date();
        const cleanToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        pickDate(cleanToday);
        setCurrentYear(cleanToday.getFullYear());
        setCurrentMonth(cleanToday.getMonth());
    };

    const renderCalendar = (): DayCell[] => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        let startWeekday = firstDay.getDay();
        let offset = (startWeekday === 0) ? 6 : startWeekday - 1;

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevMonthDate = new Date(currentYear, currentMonth, 0);
        const daysInPrev = prevMonthDate.getDate();

        const cells: DayCell[] = [];

        // Previous month days
        for (let i = offset - 1; i >= 0; i--) {
            const dayNum = daysInPrev - i;
            const datePrev = new Date(currentYear, currentMonth - 1, dayNum);
            cells.push({
                date: datePrev,
                day: dayNum,
                isCurrent: false,
                selected: selectedDate ? isSameDate(datePrev, selectedDate) : false
            });
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateCurr = new Date(currentYear, currentMonth, d);
            cells.push({
                date: dateCurr,
                day: d,
                isCurrent: true,
                selected: selectedDate ? isSameDate(dateCurr, selectedDate) : false
            });
        }

        // Next month days
        const remaining = 42 - cells.length;
        for (let n = 1; n <= remaining; n++) {
            const dateNext = new Date(currentYear, currentMonth + 1, n);
            cells.push({
                date: dateNext,
                day: n,
                isCurrent: false,
                selected: selectedDate ? isSameDate(dateNext, selectedDate) : false
            });
        }

        return cells;
    };

    // Handle outside click
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent): void => {
            const target = e.target as Node;
            const isClickInsideField = dateFieldRef.current?.contains(target);
            const isClickInsideDropdown = dropdownRef.current?.contains(target);
            
            if (!isClickInsideField && !isClickInsideDropdown && isDropdownOpen) {
                closeDropdown();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isDropdownOpen]);

    const cells = renderCalendar();

    return (
        <div className="wrapper">
            <div className="card">
                <div className="title-label">Начало</div>
                <div style={{ position: 'relative' }}>
                    <div 
                        ref={dateFieldRef}
                        className={`date-field ${isDropdownOpen ? 'active-field' : ''}`}
                        onClick={toggleDropdown}
                    >
                        <span className={`field-text ${!selectedDate ? 'placeholder' : ''}`}>
                            {selectedDate ? formatDateDMY(selectedDate) : 'Выбрать дату'}
                        </span>
                        <div 
                            className={`clear-btn ${selectedDate ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (selectedDate !== null) {
                                    resetDate();
                                    if (isDropdownOpen) {
                                        closeDropdown();
                                    }
                                }
                            }}
                        >
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18" />
                                <path d="M6 6L18 18" />
                            </svg>
                        </div>
                    </div>

                    <div 
                        ref={dropdownRef}
                        className={`dropdown ${isDropdownOpen ? 'open' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="calendar-panel">
                            <div className="cal-header">
                                <button 
                                    className="arrow-btn" 
                                    onClick={goPrevMonth}
                                    aria-label="Предыдущий месяц"
                                >
                                    «
                                </button>
                                <div className="month-year">
                                    {monthNames[currentMonth]} {currentYear}
                                </div>
                                <button 
                                    className="arrow-btn" 
                                    onClick={goNextMonth}
                                    aria-label="Следующий месяц"
                                >
                                    »
                                </button>
                            </div>
                            <div className="weekdays">
                                <span>Пн</span><span>Вт</span><span>Ср</span>
                                <span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
                            </div>
                            <div className="days-grid">
                                {cells.map((cell, index) => (
                                    <div
                                        key={index}
                                        className={`day-cell ${!cell.isCurrent ? 'other-month' : ''} ${cell.selected ? 'selected' : ''}`}
                                        onClick={() => pickDate(cell.date)}
                                    >
                                        {cell.day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
