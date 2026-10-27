import React from 'react';
import { Database, ShieldCheck, Heart, Terminal, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#001000] bg-black/90 py-12 px-4 sm:px-8 text-xs text-text-dim relative z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-headline text-primary text-base tracking-widest">EPOCH</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-border text-[10px] text-accent">TIME CAPSULE</span>
            </div>
            <p className="text-text-muted text-sm italic">
              "Every day has a story. This one's yours."
            </p>
            <p className="text-xs leading-relaxed text-text-dim">
              A full-stack data science time capsule revealing the astronomical, cultural, and statistical tapestry of the day you arrived on planet Earth.
            </p>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-headline text-text text-xs uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
              <span>Data Architecture</span>
            </div>
            <ul className="space-y-1.5 text-xs text-text-dim">
              <li><span className="text-text-muted">Music:</span> Billboard Hot 100 Historical Archives</li>
              <li><span className="text-text-muted">History & Twins:</span> Wikimedia Foundation On This Day API</li>
              <li><span className="text-text-muted">Atmosphere:</span> Open-Meteo ERA5 Global Weather Reanalysis</li>
              <li><span className="text-text-muted">Demographics:</span> UN Population Division & US SSA Baby Names</li>
              <li><span className="text-text-muted">Astronomy:</span> NASA JPL Ephemerides & Lunar Algorithms</li>
              <li><span className="text-text-muted">Economics:</span> World Bank & Federal Reserve FRED Indices</li>
            </ul>
          </div>

          {/* Privacy & Engine */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-headline text-text text-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              <span>How Epoch Works</span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">
              Zero telemetry of personal identity. Your name and birthdate are processed entirely in memory on request and are never persisted to a database.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border text-[11px] text-accent">
                <Terminal className="w-3 h-3 text-accent" />
                <span>FastAPI + SQLite WAL</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-border text-[11px] text-primary">
                <Cpu className="w-3 h-3 text-primary" />
                <span>React + Vite</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#001000] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-text-muted">EPOCH TERMINAL PROTOCOL // ONLINE // ZERO SECONDS DELAY</span>
          </div>
          <div className="flex items-center gap-1 text-text-dim">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-primary inline mx-0.5 fill-primary/30" />
            <span>for curious time travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
