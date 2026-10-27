import React, { useEffect, useState } from 'react';

export const TerminalBackground: React.FC = () => {
  const [unixTime, setUnixTime] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setUnixTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Retro Dot Grid (24px grid, Accent at ~16% opacity) */}
      <div className="absolute inset-0 dot-grid" />

      {/* Soft Accent radial glow at the top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(51,255,102,0.16),transparent_70%)] pointer-events-none" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 scanlines opacity-40" />

      {/* Floating subtle pixel stars */}
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-1 h-1 bg-accent/30 rounded-full animate-pulse" />
        <div className="absolute top-[35%] right-[15%] w-1.5 h-1.5 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[75%] left-[25%] w-1 h-1 bg-text/25 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-accent/20 rounded-full" />
        <div className="absolute top-[85%] right-[8%] w-1 h-1 bg-primary/25 rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Subtle Unix Epoch Telemetry in corner */}
      <div className="absolute bottom-2 left-4 text-[10px] font-mono text-text-dim select-none tracking-widest hidden md:block">
        EPOCH_TICK: {unixTime}s SINCE 1970-01-01T00:00:00Z
      </div>
      <div className="absolute bottom-2 right-4 text-[10px] font-mono text-text-dim select-none tracking-widest hidden md:block">
        SYS_VER: 2.4.0 // RETRO_CORE: OK
      </div>
    </div>
  );
};
