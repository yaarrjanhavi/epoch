import React, { useState } from 'react';
import { ArrowRight, Lock, Calendar, User, ChevronDown } from 'lucide-react';

interface FormBarProps {
  initialName?: string;
  initialDate?: string;
  onSubmit: (name: string, date: string) => void;
  isLoading?: boolean;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const FormBar: React.FC<FormBarProps> = ({
  initialName = '',
  initialDate = '1998-05-14',
  onSubmit,
  isLoading = false
}) => {
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const currentYear = today.getFullYear();

  // Parse date
  const parts = date.split('-');
  const y = parts[0] ? parseInt(parts[0], 10) : 1998;
  const m = parts[1] ? parseInt(parts[1], 10) : 5;
  const d = parts[2] ? parseInt(parts[2], 10) : 14;

  const daysInMonth = new Date(y, m, 0).getDate();

  const handleYearChange = (newY: number) => {
    const formatted = `${newY}-${String(m).padStart(2, '0')}-${String(Math.min(d, new Date(newY, m, 0).getDate())).padStart(2, '0')}`;
    setDate(formatted);
  };

  const handleMonthChange = (newM: number) => {
    const formatted = `${y}-${String(newM).padStart(2, '0')}-${String(Math.min(d, new Date(y, newM, 0).getDate())).padStart(2, '0')}`;
    setDate(formatted);
  };

  const handleDayChange = (newD: number) => {
    const formatted = `${y}-${String(m).padStart(2, '0')}-${String(newD).padStart(2, '0')}`;
    setDate(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Please provide a birthdate.');
      return;
    }

    const birthYear = parseInt(date.split('-')[0], 10);
    const chosenDate = new Date(date);

    if (birthYear < 1900) {
      setError('Date must be 1900 or later.');
      return;
    }
    if (chosenDate > today) {
      setError('Date must be in the past.');
      return;
    }

    setError(null);
    onSubmit(name.trim() || 'Time Traveler', date);
  };

  return (
    <div className="w-full max-w-[820px] mx-auto space-y-3">
      {/* Container: rounded 20px, Surface #141414 with faint Accent glow */}
      <div className="rounded-[20px] bg-[#141414] border border-[#001000] p-3 sm:p-4 shadow-[0_0_24px_rgba(51,255,102,0.14)] relative">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-stretch md:items-center gap-3"
        >
          {/* Block 1: Name Field (Black Inset with small uppercase Accent label) */}
          <div className="flex-1 bg-[#000000] border border-[#001800] rounded-xl px-4 py-2.5 flex flex-col justify-center focus-within:border-accent transition-colors">
            <label className="text-[10px] font-headline uppercase text-accent tracking-wider select-none flex items-center gap-1.5 mb-0.5">
              <User className="w-3 h-3 text-accent" />
              <span>YOUR NAME</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Maya, Jordan, Neo..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className="w-full bg-transparent text-sm text-text font-body placeholder:text-text-dim/50 focus:outline-none"
            />
          </div>

          {/* Block 2: Birthdate Field (Black Inset with small uppercase Accent label) */}
          <div className="flex-1 bg-[#000000] border border-[#001800] rounded-xl px-4 py-2.5 flex flex-col justify-center focus-within:border-accent transition-colors relative">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-headline uppercase text-accent tracking-wider select-none flex items-center gap-1.5 mb-0.5">
                <Calendar className="w-3 h-3 text-accent" />
                <span>BIRTHDATE</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="text-[10px] font-mono text-text-dim hover:text-accent transition-colors underline"
              >
                {showPicker ? 'close' : 'change'}
              </button>
            </div>

            <div
              onClick={() => setShowPicker(!showPicker)}
              className="text-sm font-mono text-text cursor-pointer flex items-center justify-between"
            >
              <span>{date || 'YYYY-MM-DD'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-dim" />
            </div>

            {/* Inset Date Selector Dropdown Modal */}
            {showPicker && (
              <div className="absolute top-[108%] left-0 right-0 bg-[#0a0a0a] border border-accent/40 rounded-xl p-3 shadow-2xl z-30 space-y-2">
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {/* Month */}
                  <select
                    value={m}
                    onChange={(e) => handleMonthChange(Number(e.target.value))}
                    className="bg-[#141414] border border-border text-text rounded-lg p-2 text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    {MONTHS.map((mName, idx) => (
                      <option key={mName} value={idx + 1}>
                        {mName}
                      </option>
                    ))}
                  </select>

                  {/* Day */}
                  <select
                    value={d}
                    onChange={(e) => handleDayChange(Number(e.target.value))}
                    className="bg-[#141414] border border-border text-text rounded-lg p-2 text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dayNum) => (
                      <option key={dayNum} value={dayNum}>
                        {dayNum}
                      </option>
                    ))}
                  </select>

                  {/* Year */}
                  <select
                    value={y}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    className="bg-[#141414] border border-border text-text rounded-lg p-2 text-xs focus:outline-none focus:border-accent cursor-pointer"
                  >
                    {Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setShowPicker(false)}
                    className="px-3 py-1 rounded bg-surface border border-accent/40 text-[10px] font-headline uppercase text-accent hover:bg-accent hover:text-black transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Block 3: Primary "REWIND TIME" Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group shrink-0 rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-xs font-bold uppercase tracking-widest px-6 py-4 shadow-[0_0_20px_rgba(198,255,61,0.35)] hover:shadow-[0_0_28px_rgba(198,255,61,0.5)] transition-all transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 select-none"
          >
            <span>{isLoading ? 'REWINDING...' : 'REWIND TIME'}</span>
            <ArrowRight className="w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {error && (
        <p className="text-xs text-red-400 font-mono text-center animate-pulse">
          ⚠ {error}
        </p>
      )}

      {/* Under FormBar: Lock icon + privacy copy */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-text-dim font-mono select-none">
        <Lock className="w-3.5 h-3.5 text-text-dim" />
        <span>We never store your name or birthdate.</span>
      </div>
    </div>
  );
};
