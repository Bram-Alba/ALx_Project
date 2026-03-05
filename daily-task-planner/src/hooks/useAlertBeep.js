import { useEffect, useRef } from "react";

/**
 * Plays an alert beep using Web Audio API when a task timer expires.
 * @param {Array} tasks - the full tasks array
 */
function useAlertBeep(tasks) {
  const audioCtxRef = useRef(null);
  const prevTasksRef = useRef(tasks);

  function getCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function playBeep() {
    const ctx = getCtx();

    // Play 3 short beeps in sequence
    [0, 0.25, 0.5].forEach((delay) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.2);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.2);
    });
  }

  useEffect(() => {
    const prev = prevTasksRef.current;

    tasks.forEach((task) => {
      const prevTask = prev.find((t) => t.id === task.id);
      // Detect the moment a running timer just hit its duration
      if (
        prevTask &&
        prevTask.running &&
        prevTask.time < prevTask.duration &&
        task.time >= task.duration
      ) {
        playBeep();
      }
    });

    prevTasksRef.current = tasks;
  }, [tasks]);
}

export default useAlertBeep;