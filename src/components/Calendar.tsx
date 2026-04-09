import React, { useState, useEffect } from 'react';
import hanger from '../assets/Screenshot_2026-04-09_at_6.50.41_AM-removebg-preview (1) (1).png'
import hanger2 from '../assets/hanger.png'

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

  return (
    <div className="w-full max-w-[860px] mx-auto relative flex items-center justify-center py-6 px-4 lg:px-0">
      <div className='absolute z-999  top-3 md:top-1 lg:top-1 max-w-[800px] w-[calc(100%-2rem)] lg:w-full flex justify-center pointer-events-none'>
        <img src={hanger2} alt="" className="max-w-full object-contain" />
      </div>
      {/* Controls completely outside the calendar */}
      
      <div className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 z-20 scale-75 md:scale-100 origin-right">
        <button onClick={prevMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <button onClick={nextMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
      
      <div className="w-full max-w-[800px] bg-white shadow-[-20px_10px_100px_rgba(0,0,0,0.5)] overflow-hidden font-sans relative">
 <svg
        viewBox="0 0 800 630"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* IMAGE PATTERN */}
        <defs>
          <pattern
            id="imgPattern"
            patternUnits="userSpaceOnUse"
            width="800"
            height="630"
          >
            <image
              href="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80"
              width="800"
              height="630"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>

        {/* IMAGE SHAPE */}
        <path
          d="
            M294 557
            L0 398
            L0 0
            L800 0
            L800 296.5
            L353 556
            C340 567 312 567 294 557
            Z
          "
          fill="url(#imgPattern)"
        />

        {/* RIGHT BLUE SHAPE (FIXED EDGE ALIGNMENT) */}
        <path
        d="M588.276 606.036L448.5 501L800 296.5V508.5L651.942 607.752C632.514 620.776 606.974 620.087 588.276 606.036Z"
        fill="#1E93D2"
      />

        {/* LEFT TRIANGLE */}
        <path
          d="
            M150 479
            L0 398
            L0 582
            Z
          "
          fill="#1E93D2"
        />

        {/* YEAR / MONTH TEXT */}
        <text x="730" y="490" textAnchor="end" fill="white" className="text-4xl font-extralight ">{year}</text>
        <text x="730" y="525" textAnchor="end" fill="white" className="text-4xl font-bold ">{monthName}</text>
      </svg>
      {/* Bottom Section */}
      <div className="w-full px-4 sm:px-8 md:px-12 pb-7 md:pb-14 flex flex-col md:flex-row justify-between relative z-10 -mt-2">
        
        {/* Left: Notes */}
        <div className="w-full md:w-[300px] flex flex-col pt-8 mb-0 order-2 md:order-1">
          <h3 className="font-semibold tracking-tight text-gray-800 text-md mb-4 ml-0">Notes</h3>
          <div className="w-full relative">
            <textarea 
              value={activeNote}
              onChange={handleNoteChange}
              className={`w-full resize-none outline-none bg-transparent font-medium text-gray-800 text-sm leading-[28px] tracking-tight placeholder-gray-400 transition-all ${!showNotes ? 'h-[42px] overflow-hidden md:h-[224px] md:overflow-auto' : 'h-[224px]'}`}
              style={{
                backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, #4b5563 28px)`
              }}
              placeholder={notePlaceholder}
            />
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className="md:hidden text-gray-500 hover:text-gray-800 text-xs font-semibold tracking-tight outline-none mt-1 self-start"
            >
              {showNotes ? '...hide notes' : '...show notes'}
            </button>
          </div>
        </div>

        {/* Right: Calendar Grid */}
        <div className="w-full md:w-[380px] flex flex-col pt-4 md:pt-8 relative px-0 md:pr-3 order-1 md:order-2">
          <div className="grid grid-cols-7 gap-x-1 sm:gap-x-2 gap-y-5 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
              <div key={day} className={`text-center font-semibold tracking-tight text-[10px] sm:text-[12px] ${idx >= 5 ? 'text-[#1E93D2]' : 'text-gray-800'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-4 sm:gap-y-4 text-sm sm:text-base">
            {matrix.flat().map((d, i) => {
              const dateTime = d.date.getTime();
              const startT = startDate?.getTime();
              const endT = endDate?.getTime();

              let isStart = startT === dateTime;
              let isEnd = endT === dateTime;
              let isBetween = !!(startT && endT && dateTime > startT && dateTime < endT);
              let isSingle = isStart && !endDate;

              if (startT && endT && startT === endT) {
                isSingle = isStart;
                isStart = false;
                isEnd = false;
              }

              const textColor = isStart || isEnd || isSingle
                ? 'text-white'
                : isBetween
                  ? 'text-[#1E93D2]'
                  : d.isCurrentMonth
                    ? (i % 7 >= 5 ? 'text-[#1E93D2]' : 'text-gray-800')
                    : 'text-gray-300';

              return (
                <div key={i} className="relative flex justify-center items-center h-8 sm:h-10 w-full cursor-pointer" onClick={() => handleDateClick(d.date)}>
                  {/* Background logic */}
                  {isBetween && <div className="absolute inset-0 w-full bg-[#E6F3FA]" />}
                  {isStart && endDate && <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#E6F3FA]" />}
                  {isEnd && startDate && <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#E6F3FA]" />}
                  
                  {/* Foreground Circle/Pill */}
                  <div className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-semibold transition-all duration-100 ${
                    isStart ? 'rounded-full bg-[#1E93D2]' : 
                    isEnd ? 'rounded-full bg-[#1E93D2]' : 
                    isSingle ? 'rounded-full bg-[#1E93D2]' : 
                    ''
                  } ${textColor}`}>
                    {d.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Gray Bottom Strip */}
      <div className="w-full h-20 bg-[#F5F5F5]"></div>

      </div>
      {/* End Calendar Card */}

    </div>
  );
};

export default Calendar;
