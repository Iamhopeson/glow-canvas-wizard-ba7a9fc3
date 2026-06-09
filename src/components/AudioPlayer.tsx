import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play().catch(() => setPlaying(false));
    setPlaying(!playing);
  };

  const pct = duration ? (progress / duration) * 100 : 0;
  const fmt = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  const BARS = 40;

  return (
    <div className="glass-strong rounded-3xl p-6 noise noise-overlay">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center neon-glow"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </motion.button>
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Voice intro
          </div>
          <div className="font-display font-semibold truncate">{title}</div>
        </div>
        <div className="text-xs tabular-nums text-muted-foreground">
          {fmt(progress)} / {fmt(duration)}
        </div>
      </div>

      <div className="mt-6 flex items-end gap-[3px] h-12">
        {Array.from({ length: BARS }).map((_, i) => {
          const active = (i / BARS) * 100 < pct;
          const h = 20 + Math.abs(Math.sin(i * 0.7)) * 80;
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: `${h}%`,
                background: active
                  ? "linear-gradient(180deg, var(--neon-violet), var(--neon-cyan))"
                  : "color-mix(in oklab, white 12%, transparent)",
              }}
              animate={
                playing && active
                  ? { scaleY: [1, 1.2, 0.9, 1] }
                  : { scaleY: 1 }
              }
              transition={{ duration: 0.6, repeat: playing ? Infinity : 0, delay: i * 0.02 }}
            />
          );
        })}
      </div>
    </div>
  );
}
