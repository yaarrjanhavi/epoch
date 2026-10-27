import React, { useState, useEffect } from 'react';
import { TerminalBackground } from './components/layout/TerminalBackground';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Capsule } from './pages/Capsule';
import { TimeMachineLoader } from './components/transition/TimeMachineLoader';
import { CompareModal } from './components/compare/CompareModal';
import { ShareModal } from './components/share/ShareModal';
import { fetchTimeCapsule } from './services/api';
import { TimeCapsuleResponse } from './types';
import { useKonami } from './hooks/useKonami';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function App() {
  const [viewState, setViewState] = useState<'landing' | 'loading' | 'capsule'>('landing');
  const [currentRequest, setCurrentRequest] = useState<{ name: string; date: string } | null>(null);
  const [capsuleData, setCapsuleData] = useState<TimeCapsuleResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Easter egg: Konami code
  useKonami();

  // Read date & name from URL on initial load for shareable links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const nameParam = params.get('name') || 'Time Traveler';

    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      handleFormSubmit(nameParam, dateParam);
    }
  }, []);

  const handleFormSubmit = async (name: string, date: string) => {
    setCurrentRequest({ name, date });
    setErrorMessage(null);
    setViewState('loading');

    try {
      const result = await fetchTimeCapsule(date, name, 'Worldwide');
      setCapsuleData(result);
      // Update browser URL query params so the results URL is immediately shareable
      const newUrl = `${window.location.pathname}?date=${date}&name=${encodeURIComponent(name)}`;
      window.history.pushState({}, '', newUrl);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to assemble your time capsule. Please try again.');
      setViewState('landing');
    }
  };

  const handleLoaderFinished = () => {
    if (capsuleData) {
      setViewState('capsule');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewDate = () => {
    setViewState('landing');
    setCapsuleData(null);
    setErrorMessage(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <div className="relative min-h-screen bg-background text-text flex flex-col font-body selection:bg-accent selection:text-background">
      {/* Dot-grid background (24px grid, Accent at ~16% opacity) & ambient scanlines */}
      <TerminalBackground />

      {/* Top Header */}
      <Header
        name={capsuleData?.name}
        birthDate={capsuleData?.birth_date}
        onNewDate={handleNewDate}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        isCapsuleActive={viewState === 'capsule'}
      />

      {/* Error state */}
      {errorMessage && (
        <div className="max-w-xl mx-auto my-6 px-4 z-20">
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
            {currentRequest && (
              <button
                onClick={() => handleFormSubmit(currentRequest.name, currentRequest.date)}
                className="flex items-center gap-1 px-3 py-1 bg-red-900/50 hover:bg-red-800/50 rounded-lg text-white font-mono text-[11px] cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Pages */}
      <main className="flex-1">
        {viewState === 'landing' && (
          <Landing
            onSubmit={handleFormSubmit}
            isLoading={false}
          />
        )}

        {viewState === 'loading' && currentRequest && (
          <TimeMachineLoader
            targetDate={currentRequest.date}
            targetName={currentRequest.name}
            onComplete={handleLoaderFinished}
          />
        )}

        {viewState === 'capsule' && capsuleData && (
          <Capsule
            capsule={capsuleData}
            onOpenCompare={() => setIsCompareOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {capsuleData && (
        <>
          <CompareModal
            isOpen={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
            person1Name={capsuleData.name}
            person1Date={capsuleData.birth_date}
          />

          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            capsule={capsuleData}
          />
        </>
      )}
    </div>
  );
}

export default App;
