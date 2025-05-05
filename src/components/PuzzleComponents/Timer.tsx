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
  const intervalRef = useRef<number | null>(null);
  const latestOnTimerUpdate = useRef(onTimerUpdate); // Ref to hold the latest callback
  const prevResetKeyRef = useRef(resetKey); // Ref to track previous reset key

  // Update the ref whenever onTimerUpdate changes
  useEffect(() => {
    latestOnTimerUpdate.current = onTimerUpdate;
  }, [onTimerUpdate]);

  useEffect(() => {
    // Clear any existing interval when effect re-runs or component unmounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset seconds only when resetKey actually changes
    if (resetKey !== prevResetKeyRef.current) {
      setSeconds(0);
      prevResetKeyRef.current = resetKey;
    }

    // Start a new interval only if isRunning is true
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        // Use functional update for setSeconds to avoid dependency on 'seconds' state
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          // Call the latest version of onTimerUpdate from the ref
          if (latestOnTimerUpdate.current) {
            latestOnTimerUpdate.current(newSeconds);
          }
          return newSeconds;
        });
      }, 1000);
    }

    // Cleanup function: clear interval on unmount or before effect re-runs
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Ensure ref is cleared
      }
    };
    // Dependencies: resetKey triggers reset, isRunning starts/stops.
    // Omit onTimerUpdate by using the ref pattern.
  }, [resetKey, isRunning]);

  return (
    <div className="text-center text-xl text-white md:text-2xl">
      Tiempo: <span className="font-semibold">{seconds}s</span>
    </div>
  );
};

export default Timer;
