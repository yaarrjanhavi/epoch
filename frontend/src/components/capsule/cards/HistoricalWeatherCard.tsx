import React from 'react';
import { BentoCard } from '../BentoCard';
import { Sun, CloudRain, Cloud, Snowflake, Wind } from 'lucide-react';
import { HistoricalWeather } from '../../../types';

interface HistoricalWeatherCardProps {
  weather?: HistoricalWeather;
}

export const HistoricalWeatherCard: React.FC<HistoricalWeatherCardProps> = ({ weather }) => {
  if (!weather) return null;

  const toF = (c: number) => Math.round((c * 9) / 5 + 32);

  const renderIcon = () => {
    switch (weather.icon_type) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '20s' }} strokeWidth={1.5} />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-accent animate-bounce" strokeWidth={1.5} />;
      case 'snow':
        return <Snowflake className="w-8 h-8 text-accent animate-pulse" strokeWidth={1.5} />;
      default:
        return <Cloud className="w-8 h-8 text-text animate-pulse" strokeWidth={1.5} />;
    }
  };

  return (
    <BentoCard
      title="Birth Date Skies"
      icon={<Wind className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="OPEN-METEO"
    >
      <div className="space-y-4">
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-[#001000] flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block">
              {weather.city}, {weather.country}
            </span>
            <div className="font-headline text-3xl text-primary font-bold">
              {weather.temp_max_c}°C
              <span className="text-xs font-mono text-text-dim ml-2 font-normal">
                ({toF(weather.temp_max_c)}°F)
              </span>
            </div>
            <div className="text-xs text-text-muted">
              Low: {weather.temp_min_c}°C ({toF(weather.temp_min_c)}°F)
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 shadow-inner-glow">
            {renderIcon()}
          </div>
        </div>

        <div className="bg-surface rounded-xl p-3 border border-border text-xs flex items-center justify-between">
          <span className="text-text-dim font-mono">Atmosphere Condition:</span>
          <span className="font-headline text-text uppercase text-[11px]">
            {weather.condition}
          </span>
        </div>
      </div>
    </BentoCard>
  );
};
