

interface CalendarHeaderProps {
  activeImage: string;
  year: number;
  monthName: string;
}

const CalendarHeader = ({ activeImage, year, monthName }: CalendarHeaderProps) => {
  return (
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
            href={activeImage}
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
  );
};

export default CalendarHeader;
