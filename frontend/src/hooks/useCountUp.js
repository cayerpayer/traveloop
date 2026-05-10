import { useEffect, useRef, useState } from 'react';

export default function useCountUp(value = 0, duration = 900) {
  const [displayValue, setDisplayValue] = useState(Number(value) || 0);
  const previousValue = useRef(Number(value) || 0);

  useEffect(() => {
    const start = previousValue.current;
    const end = Number(value) || 0;
    const startTime = performance.now();
    let frameId;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(start + (end - start) * eased);
      setDisplayValue(next);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        previousValue.current = end;
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return displayValue;
}
