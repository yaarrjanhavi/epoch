import React, { useState, useEffect } from 'react';
import { User, Globe, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { CustomDatePicker } from './CustomDatePicker';
import { EasterEggConfetti } from './EasterEggConfetti';

interface HeroProps {
  onSubmit: (data: { name: string; date: string; country: string }) => void;
  isLoading: boolean;
}

const COUNTRIES = [
  'Worldwide',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'India',
  'Brazil',
  'China',
  'Italy',
  'Spain',
  'Mexico',
  'South Africa'
];

export const Hero: React.FC<HeroProps> = ({ onSubmit, isLoading }) => {
  // Typewriter effect for logo "EPOCH"
  const [logoText, setLogoText] = useState('');
  const fullLogo = 'EPOCH';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogoText(fullLogo.slice(0, index + 1));
      index++;
      if (index === fullLogo.length) {
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-05-14');
  const [country, setCountry] = useState('Worldwide');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) {
      setError('Please choose or enter your birthdate.');
      return;
    }

    const birthYear = parseInt(birthDate.split('-')[0], 10);
    const today = new Date();
    const currentYear = today.getFullYear();
    const chosenDate = new Date(birthDate);

    if (birthYear < 1900) {
      setError('Date must be 1900 or later.');
      return;
    }

    if (chosenDate > today) {
      setError('Date must be in the past. Time machine cannot yet peek forward.');
      return;
    }

    setError(null);
    onSubmit({
      name: name.trim() || 'Time Traveler',
      date: birthDate,
      country
    });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 z-10">
      <div className="w-full max-w-xl mx-auto space-y-8 text-center">
        {/* Terminal Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono tracking-widest uppercase">Temporal Coordinate Terminal</span>
        </div>

        {/* Typewritten Logo + Cursor */}
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-7xl font-headline tracking-widest text-primary font-bold select-none drop-shadow-sm">
            {logoText}
            <span className="animate-blink text-accent ml-1">_</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-text-muted font-normal max-w-md mx-auto leading-relaxed">
            Every day has a story. <span className="text-text font-medium">This one's yours.</span>
          </p>
        </div>

        {/* Easter Egg check if today is their birthday */}
        <EasterEggConfetti name={name} birthDate={birthDate} />

        {/* Time Capsule Form Card */}
        <div className="retro-card p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden backdrop-blur-sm bg-[#141414]/90 border border-[#001000]">
          {/* Subtle decorative circuit corner */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 border-t-2 border-r-2 border-accent" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1: Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-headline uppercase text-primary">
                <User className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                <span>Your Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Alex, Maya, Neo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                className="w-full bg-surface border border-border focus:border-accent hover:border-accent/40 rounded-xl px-4 py-3 text-sm text-text font-body placeholder:text-text-dim/60 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {/* Field 2: Custom Date Picker */}
            <CustomDatePicker
              value={birthDate}
              onChange={setBirthDate}
              error={error}
            />

            {/* Field 3: Country / Region (Optional local flavor) */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-headline uppercase text-primary">
                <Globe className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                <span>Regional Flavour (Optional)</span>
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none bg-surface border border-border focus:border-accent hover:border-accent/40 rounded-xl px-4 py-3 text-sm text-text font-body focus:outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-surface text-text">
                      {c === 'Worldwide' ? 'Worldwide (Global averages & USD)' : c}
                    </option>
                  ))}
                </select>
                <Compass className="w-4 h-4 text-text-dim absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-text-dim font-mono">
                Customizes local weather city, currency in the Money Machine, and life expectancy.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative overflow-hidden rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-sm font-bold uppercase tracking-widest py-4 px-6 shadow-glow-primary hover:shadow-glow transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {/* Retro pixel shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <Sparkles className="w-4 h-4 text-background group-hover:rotate-12 transition-transform" />
              <span>REWIND TIME</span>
              <ArrowRight className="w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Subtle Konami Hint */}
        <div className="text-[11px] font-mono text-text-dim/60 select-none">
          HINT: ARCADE PILOTS MAY ENTER THE SECRET KEY COMBINATION ON THE KEYBOARD
        </div>
      </div>
    </section>
  );
};
