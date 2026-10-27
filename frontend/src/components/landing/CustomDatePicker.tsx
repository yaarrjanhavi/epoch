import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  error?: string | null;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  error
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Parse current value
  const parts = value.split('-');
  const initialYear = parts[0] ? parseInt(parts[0], 10) : 1998;
  const initialMonth = parts[1] ? parseInt(parts[1], 10) : 5;
  const initialDay = parts[2] ? parseInt(parts[2], 10) : 14;

  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const [day, setDay] = useState<number>(initialDay);
  const [typedInput, setTypedInput] = useState<string>(value);
  const [mode, setMode] = useState<'picker' | 'text'>('picker');

  // Days in selected month
  const daysInMonth = new Date(year, month, 0).getDate();

  useEffect(() => {
    // clamp day if needed
    const validDay = Math.min(day, daysInMonth);
    if (validDay !== day) {
      setDay(validDay);
    }
    const formatted = `${year}-${String(month).padStart(2, '0')}-${String(validDay).padStart(2, '0')}`;
    setTypedInput(formatted);
    onChange(formatted);
  }, [year, month, day, daysInMonth]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setTypedInput(text);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      const [y, m, d] = text.split('-').map(Number);
      if (y >= 1900 && y <= currentYear && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        setYear(y);
        setMonth(m);
        setDay(d);
        onChange(text);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <label className="flex items-center gap-1.5 font-headline uppercase text-primary">
          <Calendar className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
          <span>Birthdate</span>
        </label>
        <button
          type="button"
          onClick={() => setMode(mode === 'picker' ? 'text' : 'picker')}
          className="text-[11px] text-text-dim hover:text-accent underline transition-colors"
        >
          {mode === 'picker' ? 'Type date directly' : 'Switch to selectors'}
        </button>
      </div>

      {mode === 'picker' ? (
        <div className="grid grid-cols-3 gap-2">
          {/* Month */}
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full appearance-none bg-surface border border-border focus:border-accent hover:border-accent/60 rounded-xl px-3 py-3 text-sm text-text font-body focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
            >
              {MONTHS.map((mName, idx) => (
                <option key={mName} value={idx + 1} className="bg-surface text-text">
                  {mName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-dim absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Day */}
          <div className="relative">
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full appearance-none bg-surface border border-border focus:border-accent hover:border-accent/60 rounded-xl px-3 py-3 text-sm text-text font-body focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d} className="bg-surface text-text">
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-dim absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Year */}
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full appearance-none bg-surface border border-border focus:border-accent hover:border-accent/60 rounded-xl px-3 py-3 text-sm text-text font-body focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
            >
              {Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y} className="bg-surface text-text">
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-dim absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={typedInput}
            onChange={handleTextChange}
            className="w-full bg-surface border border-border focus:border-accent rounded-xl px-4 py-3 text-sm text-text font-mono placeholder:text-text-dim/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
          />
          <div className="text-[11px] text-text-dim mt-1 font-mono">
            Format: YYYY-MM-DD (e.g. 1998-05-14)
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 font-mono mt-1 animate-pulse">
          ⚠ {error}
        </p>
      )}
    </div>
  );
};
