interface CalendarControlsProps {
  prevMonth: () => void;
  nextMonth: () => void;
}

const CalendarControls = ({ prevMonth, nextMonth }: CalendarControlsProps) => {
  return (
    <div className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 z-20 scale-75 md:scale-100 origin-right">
      <button onClick={prevMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>
      <button onClick={nextMonth} className="p-3 bg-white shadow hover:bg-gray-50 rounded-full text-gray-500 transition-colors cursor-pointer outline-none border border-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
    </div>
  );
};

export default CalendarControls;
