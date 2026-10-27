import React from 'react';
import { BentoCard } from '../BentoCard';
import { Sparkles, Gem, Compass } from 'lucide-react';
import { ZodiacInfo, ChineseZodiacInfo, BirthstoneInfo } from '../../../types';

interface ZodiacCardProps {
  westernZodiac: ZodiacInfo;
  chineseZodiac: ChineseZodiacInfo;
  birthstone: BirthstoneInfo;
}

export const ZodiacCard: React.FC<ZodiacCardProps> = ({
  westernZodiac,
  chineseZodiac,
  birthstone
}) => {
  return (
    <BentoCard
      title="Celestial Archetypes"
      icon={<Sparkles className="w-4 h-4 text-text hover:text-primary transition-colors" strokeWidth={1.5} />}
      badge="COSMOLOGY"
      className="col-span-1 md:col-span-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Western Zodiac */}
        <div className="bg-surface rounded-xl p-3.5 border border-border flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-dim uppercase">Western Zodiac</span>
              <span className="text-xl text-primary">{westernZodiac.symbol}</span>
            </div>
            <div className="font-headline text-base text-primary uppercase mt-1">
              {westernZodiac.sign}
            </div>
            <div className="text-[10px] font-mono text-accent">
              Element: {westernZodiac.element} // {westernZodiac.dates}
            </div>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed italic">
            "{westernZodiac.blurb}"
          </p>
        </div>

        {/* Chinese Zodiac */}
        <div className="bg-surface rounded-xl p-3.5 border border-border flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-dim uppercase">Chinese Zodiac</span>
              <Compass className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <div className="font-headline text-base text-primary uppercase mt-1">
              Year of the {chineseZodiac.animal}
            </div>
            <div className="text-[10px] font-mono text-accent">
              {chineseZodiac.element} • {chineseZodiac.yin_yang}
            </div>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed italic">
            "{chineseZodiac.blurb}"
          </p>
        </div>

        {/* Birthstone */}
        <div className="bg-surface rounded-xl p-3.5 border border-border flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-dim uppercase">Birthstone</span>
              <Gem className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div className="font-headline text-base text-text uppercase mt-1 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-border inline-block" style={{ backgroundColor: birthstone.color }} />
              <span>{birthstone.gem}</span>
            </div>
            <div className="text-[10px] font-mono text-text-dim">
              Talisman of Time
            </div>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            {birthstone.meaning}
          </p>
        </div>
      </div>
    </BentoCard>
  );
};
