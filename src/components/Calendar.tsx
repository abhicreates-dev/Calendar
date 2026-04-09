import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();

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
          week.push({ day: daysInPrevMonth - shift + col + 1, isCurrentMonth: false });
        } else if (currentDay <= daysInMonth) {
          week.push({ day: currentDay, isCurrentMonth: true });
          currentDay++;
        } else {
          week.push({ day: nextMonthDay, isCurrentMonth: false });
          nextMonthDay++;
        }
      }
      matrix.push(week);
      if (currentDay > daysInMonth && row >= 4) break;
    }
    return matrix;
  };

  const matrix = getDaysMatrix(year, currentDate.getMonth());

  return (
    <div className="w-full max-w-[860px] mx-auto relative flex items-center justify-center py-6">
      <div className="w-full max-w-[800px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden font-sans relative">
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
      <div className="w-full px-12 pb-14 flex justify-between relative z-10 -mt-2">
        
        {/* Left: Notes */}
        <div className="w-[300px] flex flex-col pt-8">
          <h3 className="font-bold text-gray-800 text-sm mb-6 ml-2">Notes</h3>
          <div className="flex flex-col gap-y-7">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-px w-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Right: Calendar Grid */}
        <div className="w-[380px] flex flex-col pt-8 relative pr-3">
          <div className="grid grid-cols-7 gap-x-2 gap-y-5 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
              <div key={day} className={`text-center font-bold text-[11px] ${idx >= 5 ? 'text-[#1E93D2]' : 'text-gray-800'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-x-2 gap-y-6">
            {matrix.flat().map((d, i) => (
              <div key={i} className={`text-center font-bold text-base ${d.isCurrentMonth ? (i % 7 >= 5 ? 'text-[#1E93D2]' : 'text-gray-800') : 'text-gray-300'}`}>
                {d.day}
              </div>
            ))}
          </div>
        </div>

      </div>
      </div>
      {/* End Calendar Card */}

      {/* Controls completely outside the calendar */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <button onClick={prevMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <button onClick={nextMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

    </div>
  );
};

export default Calendar;
