import { useEffect, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonami() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let pointer = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const targetKey = KONAMI_SEQUENCE[pointer].toLowerCase();

      if (key === targetKey) {
        pointer++;
        if (pointer === KONAMI_SEQUENCE.length) {
          // Trigger Easter Egg
          setActivated(true);
          document.body.classList.add('konami-rainbow');
          setTimeout(() => {
            document.body.classList.remove('konami-rainbow');
            setActivated(false);
          }, 5000);
          pointer = 0;
        }
      } else {
        pointer = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return activated;
}
