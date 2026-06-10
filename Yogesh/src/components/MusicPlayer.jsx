import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const timeoutsRef = useRef([]);

  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);
      filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

      const delay = audioCtx.createDelay(1.2);
      delay.delayTime.setValueAtTime(0.6, audioCtx.currentTime);

      const delayFeedback = audioCtx.createGain();
      delayFeedback.gain.setValueAtTime(0.45, audioCtx.currentTime);

      const mainGain = audioCtx.createGain();
      mainGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

      delay.connect(delayFeedback);
      delayFeedback.connect(delay);

      filter.connect(mainGain);
      filter.connect(delay);
      delay.connect(mainGain);
      mainGain.connect(audioCtx.destination);

      const freqs = [130.81, 196.00, 233.08, 293.66, 311.13, 392.00];
      const oscillators = [];

      freqs.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();

        osc.type = index % 2 === 0 ? 'triangle' : 'sine';
        
        const detuneAmt = (Math.random() - 0.5) * 0.8;
        osc.frequency.setValueAtTime(freq + detuneAmt, audioCtx.currentTime);

        oscGain.gain.setValueAtTime(0, audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();

        const triggerSwell = () => {
          if (!audioCtx || audioCtx.state === 'closed') return;
          
          const now = audioCtx.currentTime;
          const duration = 5 + Math.random() * 5;
          const wait = Math.random() * 3;

          oscGain.gain.setValueAtTime(0, now);
          oscGain.gain.linearRampToValueAtTime(0.012 + Math.random() * 0.015, now + wait + duration * 0.4);
          oscGain.gain.linearRampToValueAtTime(0, now + wait + duration);

          const timeoutId = setTimeout(triggerSwell, (wait + duration) * 1000);
          timeoutsRef.current.push(timeoutId);
        };

        triggerSwell();
        oscillators.push({ osc, oscGain });
      });

      synthRef.current = {
        audioCtx,
        oscillators,
        close: () => {
          oscillators.forEach(o => {
            try { o.osc.stop(); } catch (err) {}
          });
          try { audioCtx.close(); } catch (err) {}
        }
      };
    } catch (err) {
      console.warn("Web Audio API not supported or blocked: ", err);
    }
  };

  const stopSynth = () => {
    timeoutsRef.current.forEach(tId => clearTimeout(tId));
    timeoutsRef.current = [];

    if (synthRef.current) {
      synthRef.current.close();
      synthRef.current = null;
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(tId => clearTimeout(tId));
      if (synthRef.current) {
        synthRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel border border-white/5 cursor-pointer shadow-lg transition-all duration-300 select-none hover:bg-white/10 ${
        isPlaying ? 'border-red-500/30 shadow-red-500/10' : 'hover:border-white/20'
      }`} 
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
    >
      
      <div className="music-bars">
        <span className={`w-[2px] bg-red-500 rounded-full ${isPlaying ? 'music-bar-anim' : 'h-[6px]'}`}></span>
        <span className={`w-[2px] bg-red-500 rounded-full ${isPlaying ? 'music-bar-anim' : 'h-[10px]'}`}></span>
        <span className={`w-[2px] bg-red-500 rounded-full ${isPlaying ? 'music-bar-anim' : 'h-[4px]'}`}></span>
        <span className={`w-[2px] bg-red-500 rounded-full ${isPlaying ? 'music-bar-anim' : 'h-[12px]'}`}></span>
        <span className={`w-[2px] bg-red-500 rounded-full ${isPlaying ? 'music-bar-anim' : 'h-[8px]'}`}></span>
      </div>
      
      
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
        {isPlaying ? 'Mute' : 'Play Drone'}
      </span>
      {isPlaying ? <Volume2 size={13} className="text-red-500 animate-pulse" /> : <VolumeX size={13} className="text-slate-400" />}
    </div>
  );
}
