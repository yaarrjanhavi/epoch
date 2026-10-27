import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Sparkles, Calendar, Rocket, Compass, HeartHandshake } from 'lucide-react';
import { fetchCompare } from '../../services/api';
import { CompareResponse } from '../../types';
import { CustomDatePicker } from '../landing/CustomDatePicker';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  person1Name: string;
  person1Date: string;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  person1Name,
  person1Date
}) => {
  const [person2Name, setPerson2Name] = useState('');
  const [person2Date, setPerson2Date] = useState('2000-01-01');
  const [comparison, setComparison] = useState<CompareResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchCompare(
        person1Date,
        person2Date,
        person1Name,
        person2Name || 'Partner'
      );
      setComparison(res);
    } catch (err: any) {
      setError(err.message || 'Failed to compare timelines.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="retro-card w-full max-w-2xl bg-[#141414] border-2 border-border p-6 sm:p-8 space-y-6 relative shadow-glow my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text hover:text-primary hover:border-accent transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <h2 className="font-headline text-lg sm:text-xl text-primary uppercase tracking-wider">
              Compare Timelines
            </h2>
          </div>
          <p className="text-xs text-text-muted">
            Align two cosmic paths through space and discover shared milestones.
          </p>
        </div>

        {/* Comparison Form */}
        <form onSubmit={handleCompare} className="space-y-4 bg-[#0a0a0a] p-4 rounded-xl border border-[#001000]">
          <div className="text-[11px] font-mono text-text-dim flex items-center gap-2">
            <span>Primary Time Traveler:</span>
            <span className="text-text font-bold uppercase">{person1Name}</span>
            <span>({person1Date})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-headline text-text uppercase">Second Person Name</label>
              <input
                type="text"
                placeholder="e.g. Maya, Jordan, Mom..."
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                className="w-full bg-surface border border-border focus:border-accent rounded-xl px-3 py-2 text-xs text-text font-body focus:outline-none"
              />
            </div>
            <div>
              <CustomDatePicker
                value={person2Date}
                onChange={setPerson2Date}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-primary hover:bg-[#d6ff5c] text-background font-headline text-xs font-bold uppercase tracking-wider shadow-glow-primary transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'CALCULATING TEMPORAL ALIGNMENT...' : 'ALIGN TIMELINES'}
          </button>
        </form>

        {error && (
          <p className="text-xs text-red-400 font-mono text-center">
            ⚠ {error}
          </p>
        )}

        {/* Comparison Results */}
        {comparison && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-2"
          >
            {/* Synastry Blurb */}
            <div className="p-4 rounded-xl bg-surface border border-accent/40 text-xs leading-relaxed text-text">
              <span className="font-headline text-accent uppercase mr-1.5">Synastry Verdict:</span>
              {comparison.fun_synastry_blurb}
            </div>

            {/* Key Comparison Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-surface rounded-xl p-3 border border-border">
                <span className="text-[10px] font-mono text-text-dim uppercase block">Older Person</span>
                <span className="font-headline text-text text-sm font-bold uppercase">
                  {comparison.older_person}
                </span>
                <span className="text-[10px] text-accent block mt-0.5">
                  by {comparison.age_difference_days.toLocaleString()} days ({comparison.age_difference_years} yrs)
                </span>
              </div>

              <div className="bg-surface rounded-xl p-3 border border-border">
                <span className="text-[10px] font-mono text-text-dim uppercase block">Combined Life Days</span>
                <span className="font-headline text-primary text-sm font-bold">
                  {comparison.combined_days_lived.toLocaleString()}
                </span>
                <span className="text-[10px] text-text-dim block mt-0.5 font-mono">
                  Collective rotations
                </span>
              </div>

              <div className="bg-surface rounded-xl p-3 border border-border">
                <span className="text-[10px] font-mono text-text-dim uppercase block">Cosmic Distance Lead</span>
                <span className="font-headline text-text text-sm font-bold">
                  {(comparison.cosmic_distance_diff_km / 1e9).toFixed(2)}B km
                </span>
                <span className="text-[10px] text-text-dim block mt-0.5 font-mono">
                  Heliocentric separation
                </span>
              </div>
            </div>

            {/* Next Combined Milestone */}
            <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#001000] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-accent shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="font-headline text-text uppercase text-[11px]">
                    Combined {comparison.next_combined_milestone_days.toLocaleString()} Days Milestone
                  </div>
                  <div className="text-[10px] text-text-muted">
                    When you both reach this total lived days mark
                  </div>
                </div>
              </div>
              <span className="font-headline text-primary text-xs uppercase">
                {comparison.next_combined_milestone_date}
              </span>
            </div>

            {/* Shared Milestones */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider block">
                TIMELINE CONVERGENCE POINTS
              </span>
              {comparison.shared_milestones.map((sm, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-surface border border-border text-xs flex justify-between items-center">
                  <div>
                    <span className="font-headline text-text text-[11px] block">{sm.title}</span>
                    <span className="text-[10px] text-text-muted">{sm.description}</span>
                  </div>
                  <span className="font-mono text-accent text-[11px] shrink-0 ml-2">{sm.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
