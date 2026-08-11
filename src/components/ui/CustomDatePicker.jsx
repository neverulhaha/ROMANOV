import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomDatePicker({ selectedDate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Parse initial date or default to August 10, 2026
  const initialDateObj = selectedDate ? new Date(selectedDate) : new Date(2026, 7, 10);
  const [currentYear, setCurrentYear] = useState(initialDateObj.getFullYear() || 2026);
  const [currentMonth, setCurrentMonth] = useState(initialDateObj.getMonth() || 7);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday = 0
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDay = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onChange(dateString);
    setIsOpen(false);
  };

  // Format date for trigger display (e.g. 10.08.2026)
  const formatDisplay = (dateStr) => {
    if (!dateStr) return 'Выберите дату';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateStr;
  };

  const selectedDayNum = selectedDate ? parseInt(selectedDate.split('-')[2], 10) : null;
  const selectedMonthNum = selectedDate ? parseInt(selectedDate.split('-')[1], 10) - 1 : null;
  const selectedYearNum = selectedDate ? parseInt(selectedDate.split('-')[0], 10) : null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#081510] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white flex items-center justify-between focus:outline-none focus:border-[#E2C17C] transition-colors cursor-pointer hover:border-[#E2C17C]/60"
      >
        <span className="font-serif tracking-wider">{formatDisplay(selectedDate)}</span>
        <CalendarIcon className="w-4 h-4 text-[#E2C17C]" />
      </button>

      {/* Luxury Brand Calendar Dropdown Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 z-50 w-72 bg-[#0D1F18] border border-[#E2C17C]/40 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 text-slate-300 hover:text-[#E2C17C] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 text-slate-300 hover:text-[#E2C17C] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Week Days Bar */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDays.map((d) => (
                <span key={d} className="text-[10px] uppercase font-bold text-[#E2C17C]">
                  {d}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Empty Offsets */}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="h-8" />
              ))}

              {/* Days of Month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isSelected =
                  selectedDayNum === dayNum &&
                  selectedMonthNum === currentMonth &&
                  selectedYearNum === currentYear;

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => handleSelectDay(dayNum)}
                    className={`h-8 rounded-lg flex items-center justify-center font-serif text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E2C17C] text-[#0D1F18] font-bold shadow-md scale-105'
                        : 'text-slate-200 hover:bg-white/10 hover:text-[#E2C17C]'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Quick Select Presets */}
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-[10px]">
              <button
                type="button"
                onClick={() => {
                  onChange('2026-08-10');
                  setIsOpen(false);
                }}
                className="text-[#E2C17C] font-semibold hover:underline"
              >
                10 Авг
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('2026-08-14');
                  setIsOpen(false);
                }}
                className="text-[#E2C17C] font-semibold hover:underline"
              >
                Пятница
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('2026-08-15');
                  setIsOpen(false);
                }}
                className="text-[#E2C17C] font-semibold hover:underline"
              >
                Суббота
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
