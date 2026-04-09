import React from 'react';

interface NotesSectionProps {
  activeNote: string;
  handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showNotes: boolean;
  setShowNotes: (show: boolean) => void;
  notePlaceholder: string;
}

const NotesSection = ({ activeNote, handleNoteChange, showNotes, setShowNotes, notePlaceholder }: NotesSectionProps) => {
  return (
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
  );
};

export default NotesSection;
