import { useEffect, useState, useRef } from 'react';
import { MAX_TIME_MINUTES } from '../data/questions';

export default function Timer({ onTimeUp, paused }) {
  const totalSeconds = MAX_TIME_MINUTES * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [paused, onTimeUp]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const elapsed = totalSeconds - remaining;
  const pct = (elapsed / totalSeconds) * 100;

  const isWarning = remaining <= 600 && remaining > 300;
  const isDanger = remaining <= 300;

  return (
    <div className={`timer-widget ${isWarning ? 'timer-warning' : ''} ${isDanger ? 'timer-danger' : ''}`}>
      <svg viewBox="0 0 36 36" className="timer-ring">
        <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="2.5" stroke="currentColor" opacity="0.15" />
        <circle
          cx="18" cy="18" r="15.9" fill="none" strokeWidth="2.5"
          stroke="currentColor"
          strokeDasharray="100"
          strokeDashoffset={100 - pct}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="timer-text">
        {h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
      </div>
    </div>
  );
}

export function useElapsedTimer() {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  useEffect(() => {
    const iv = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(iv);
  }, []);
  return elapsed;
}
