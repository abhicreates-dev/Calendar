
interface MatrixDay {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
}

interface CalendarGridProps {
  matrix: MatrixDay[][];
  startDate: Date | null;
  endDate: Date | null;
  handleDateClick: (date: Date) => void;
}

const CalendarGrid = ({ matrix, startDate, endDate, handleDateClick }: CalendarGridProps) => {
  return (
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
              {isBetween && <div className="absolute inset-0 w-full bg-[#E6F3FA]" />}
              {isStart && endDate && <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#E6F3FA]" />}
              {isEnd && startDate && <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#E6F3FA]" />}
              
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
  );
};

export default CalendarGrid;
