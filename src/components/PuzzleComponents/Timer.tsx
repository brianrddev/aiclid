import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTimerUpdate?: (seconds: number) => void; // Callback to update parent with time
  resetKey?: any; // Change this key to reset the timer
}

/**
 * Component that displays a timer (seconds).
 * Starts when isRunning becomes true, stops when it becomes false.
 * Can be reset by changing the resetKey prop.
 */
const Timer: React.FC<TimerProps> = ({
  isRunning,
  onTimerUpdate,
  resetKey,
}) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset timer when resetKey changes
    setSeconds(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Start timer immediately if isRunning is true upon reset
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          if (onTimerUpdate) {
            onTimerUpdate(newSeconds);
          }
          return newSeconds;
        });
      }, 1000);
    }
  }, [resetKey, isRunning, onTimerUpdate]); // Rerun effect if isRunning changes *after* reset

  useEffect(() => {
    if (isRunning) {
      // Start timer if not already running
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds + 1;
            if (onTimerUpdate) {
              onTimerUpdate(newSeconds);
            }
            return newSeconds;
          });
        }, 1000);
      }
    } else {
      // Stop timer if running
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimerUpdate]);

  return (
    <div className="text-center text-xl text-white md:text-2xl">
      Tiempo: <span className="font-semibold">{seconds}s</span>
    </div>
  );
};

export default Timer;
