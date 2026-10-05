import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const [idx, setIdx] = useState(0);
  const p = projects[idx];
  const host = p.demo.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section id="projects" className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">PROJECTS</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Featured Works<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>
        <div role="tablist" aria-label="Projects" className="flex flex-wrap items-end gap-x-10 gap-y-3 mb-8">
          {projects.map((x, i) => (
            <button
              key={x.title}
              role="tab"
              aria-selected={i === idx}
              onClick={() => setIdx(i)}
              className="relative pb-3 text-left cursor-pointer"
            >
              <span className={`block font-heading font-semibold text-xl sm:text-3xl tracking-tight transition-colors duration-300 ${i === idx ? 'text-white' : 'text-white/20 hover:text-white/50'}`}>
                {x.title}
              </span>
              {i === idx && (
                <motion.span layoutId="projTab" className="absolute left-0 right-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-red-600 to-red-400" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="glass-panel rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] text-left"
          >
            <div className="p-5 sm:p-7 lg:border-r border-b lg:border-b-0 border-white/5 bg-gradient-to-br from-red-600/[0.08] to-transparent flex flex-col">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0b0a10] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 px-3.5 py-2.5 bg-white/[0.04] border-b border-white/5">
                  <span className="flex gap-1.5">
                    <i className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <i className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <i className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  </span>
                  <span className="flex-1 min-w-0 truncate px-3 py-1 text-[11px] text-slate-400 bg-black/40 rounded-md border border-white/5">{host}</span>
                  <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
                  </span>
                </div>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title} live demo`} className="group relative block aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={`${p.title} preview`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#06050a]/70 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <span className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-full">
                      Open live site <ExternalLink size={13} />
                    </span>
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {p.metrics.map((m) => (
                  <div key={m.label} className="border-l-2 border-red-500/60 pl-3">
                    <p className="font-heading font-semibold text-xl sm:text-2xl text-white leading-none">{m.value}</p>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 sm:p-9 flex flex-col">
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-white leading-snug">{p.subtitle}</h3>
              <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">{p.desc}</p>
              <div className="mt-6">
                <p className="text-xs text-slate-500 mb-2.5">How it fits together</p>
                <div className="flex flex-wrap items-center gap-y-2">
                  {p.flow.map((n, i) => (
                    <span key={n} className="flex items-center">
                      <span className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500/10 border border-red-500/30 rounded-lg">{n}</span>
                      {i < p.flow.length - 1 && <ChevronRight size={14} className="mx-1 text-red-500/70" />}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-slate-300 font-light leading-relaxed">
                    <span className="mt-2.5 w-3 h-px bg-red-500 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-6">
                {p.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[11px] text-slate-300 border border-white/10 rounded-full">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto pt-8">
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_24px_rgba(232,0,13,0.3)] transition-colors">
                  <ExternalLink size={15} /> Live demo
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white border border-white/10 hover:border-white/25 rounded-xl bg-white/5 transition-colors">
                  <Github size={15} /> Source code
                </a>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
