import React, { useState, useEffect } from 'react';
import hanger2 from '../assets/hanger.png'
import CalendarHeader from './CalendarHeader';
import CalendarControls from './CalendarControls';
import NotesSection from './NotesSection';
import CalendarGrid from './CalendarGrid';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026
  const [showNotes, setShowNotes] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('calendar_notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('calendar_notes', JSON.stringify(notes));
  }, [notes]);

  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysMatrix = (y: number, m: number) => {
    const firstDay = new Date(y, m, 1);
    const startingDay = firstDay.getDay(); 
    const shift = startingDay === 0 ? 6 : startingDay - 1;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrevMonth = new Date(y, m, 0).getDate();

    const matrix = [];
    let currentDay = 1;
    let nextMonthDay = 1;

    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < shift) {
          const d = daysInPrevMonth - shift + col + 1;
          week.push({ day: d, isCurrentMonth: false, date: new Date(y, m - 1, d) });
        } else if (currentDay <= daysInMonth) {
          week.push({ day: currentDay, isCurrentMonth: true, date: new Date(y, m, currentDay) });
          currentDay++;
        } else {
          week.push({ day: nextMonthDay, isCurrentMonth: false, date: new Date(y, m + 1, nextMonthDay) });
          nextMonthDay++;
        }
      }
      matrix.push(week);
    }
    return matrix;
  };

  const handleDateClick = (date: Date) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate.getTime() === startDate.getTime()) {
        setStartDate(null);
      } else if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    } else if (startDate && endDate) {
      if (clickedDate.getTime() === startDate.getTime() || clickedDate.getTime() === endDate.getTime()) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
      }
    }
  };

  const matrix = getDaysMatrix(year, currentDate.getMonth());

  const getNoteKey = () => {
    if (!startDate && !endDate) return `month_${year}_${currentDate.getMonth()}`;
    if (startDate && !endDate) return `date_${startDate.toISOString().split('T')[0]}`;
    if (startDate && endDate) return `range_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}`;
    return '';
  };
  const noteKey = getNoteKey();
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(prev => ({ ...prev, [noteKey]: e.target.value }));
  };
  
  const activeNote = notes[noteKey] || '';
  
  const notePlaceholder = (!startDate && !endDate)
    ? `Notes for ${monthName} ${year}...` 
    : (startDate && !endDate)
      ? `Notes for ${startDate.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}...`
      : `Notes for ${startDate?.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endDate?.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}...`;

const monthImages = [
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1462206092226-f46025ffe607?auto=format&fit=crop&w=1600&q=80",
"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
  "https://media.licdn.com/dms/image/v2/D4D22AQFk7PuyyW0Uwg/feedshare-shrink_800/feedshare-shrink_800/0/1701088274772?e=2147483647&v=beta&t=AhC_Siu3shOk-VBco64U54Z4Q4mIfIzQWKCEiNu9uTA"
];
  const activeImage = monthImages[currentDate.getMonth()];

  return (
    <div className="w-full max-w-[860px] mx-auto relative flex items-center justify-center py-6 px-4 lg:px-0 ">
      <div className='absolute z-999  top-3 md:top-1 lg:top-1 max-w-[800px] w-[calc(100%-2rem)] lg:w-full flex justify-center pointer-events-none'>
        <img src={hanger2} alt="" className="max-w-full object-contain" />
      </div>
      {/* Controls completely outside the calendar */}
      
      <CalendarControls prevMonth={prevMonth} nextMonth={nextMonth} />
      
      <div className="w-full max-w-[800px] bg-white shadow-[-20px_10px_100px_rgba(0,0,0,0.5)] overflow-hidden font-sans relative">
        <CalendarHeader activeImage={activeImage} year={year} monthName={monthName} />
        
        {/* Bottom Section */}
        <div className="w-full px-4 sm:px-8 md:px-12 pb-7 md:pb-14 flex flex-col md:flex-row justify-between relative z-10 -mt-2">
          
          <NotesSection 
            activeNote={activeNote}
            handleNoteChange={handleNoteChange}
            showNotes={showNotes}
            setShowNotes={setShowNotes}
            notePlaceholder={notePlaceholder}
          />

          <CalendarGrid 
            matrix={matrix}
            startDate={startDate}
            endDate={endDate}
            handleDateClick={handleDateClick}
          />

        </div>

        {/* Gray Bottom Strip */}
        <div className="w-full h-20 bg-[#F5F5F5]"></div>

      </div>
      {/* End Calendar Card */}

    </div>
  );
};

export default Calendar;
