import { useState, useCallback, useRef } from 'react';
import { STROKE_FADE_DURATION, STROKE_VISIBLE_DURATION } from '../constants/theme.js';

let strokeId = 1;

export function useDrawing(drawColour) {
  const [strokes, setStrokes] = useState([]);
  const activeStrokeRef = useRef(null);
  const timersRef = useRef({});

  const startStroke = useCallback((point) => {
    const id = strokeId++;
    activeStrokeRef.current = id;
    setStrokes((prev) => [...prev, { id, points: [point], colour: drawColour, opacity: 1 }]);
  }, [drawColour]);

  const continueStroke = useCallback((point) => {
    const id = activeStrokeRef.current;
    if (id == null) return;
    setStrokes((prev) =>
      prev.map((s) => s.id === id ? { ...s, points: [...s.points, point] } : s)
    );
  }, []);

  const endStroke = useCallback(() => {
    const id = activeStrokeRef.current;
    activeStrokeRef.current = null;
    if (id == null) return;

    const visibleTimer = setTimeout(() => {
      const fadeStart = Date.now();
      const fadeTick = setInterval(() => {
        const elapsed = Date.now() - fadeStart;
        const opacity = Math.max(0, 1 - elapsed / STROKE_FADE_DURATION);
        setStrokes((prev) =>
          prev.map((s) => (s.id === id ? { ...s, opacity } : s))
        );
        if (opacity <= 0) {
          clearInterval(fadeTick);
          setStrokes((prev) => prev.filter((s) => s.id !== id));
          delete timersRef.current[`fade_${id}`];
        }
      }, 32);
      timersRef.current[`fade_${id}`] = fadeTick;
    }, STROKE_VISIBLE_DURATION);

    timersRef.current[id] = visibleTimer;
  }, []);

  const clearStrokes = useCallback(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    Object.values(timersRef.current).forEach(clearInterval);
    timersRef.current = {};
    activeStrokeRef.current = null;
    setStrokes([]);
  }, []);

  return { strokes, startStroke, continueStroke, endStroke, clearStrokes };
}
