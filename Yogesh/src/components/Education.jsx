import { motion } from 'framer-motion';
import { GraduationCap, Award, ScrollText, MapPin, Calendar, BadgeCheck } from 'lucide-react';
import { experience, education } from '../data/portfolioData';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const typeIcon = { Degree: GraduationCap, Certification: Award, Diploma: ScrollText };

const R = 30;
const C = 2 * Math.PI * R;
const Ring = ({ pct, delay }) => (
  <svg viewBox="0 0 76 76" className="w-[76px] h-[76px] -rotate-90 shrink-0" aria-hidden="true">
    <circle cx="38" cy="38" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
    <motion.circle
      cx="38" cy="38" r={R} fill="none" stroke="url(#ringGrad)" strokeWidth="5" strokeLinecap="round"
      strokeDasharray={C}
      initial={{ strokeDashoffset: C }}
      whileInView={{ strokeDashoffset: C * (1 - pct / 100) }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    />
  </svg>
);

export default function Education() {
  return (
    <section id="education" className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff2a3b" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">JOURNEY</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Experience &amp; Education<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>
        {experience.map((job) => (
          <motion.article
            key={job.company}
            className="relative glass-panel rounded-[28px] overflow-hidden mb-24 text-left grid grid-cols-1 lg:grid-cols-[250px_1fr]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <aside className="relative p-7 lg:p-8 bg-gradient-to-b from-red-600/[0.14] via-red-900/[0.06] to-transparent lg:border-r border-b lg:border-b-0 border-white/5 flex flex-col">
              <span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                {job.status}
              </span>

              <div className="mt-8 flex items-end gap-2 leading-none">
                <span
                  className="font-heading font-semibold text-[56px] lg:text-[64px] text-transparent"
                  style={{ WebkitTextStroke: '1px #ff2a3b' }}
                >
                  {String(job.months).padStart(2, '0')}
                </span>
                <span className="pb-3 text-sm font-semibold text-slate-300">months</span>
              </div>

              <div className="mt-6 space-y-2.5 text-sm text-slate-300">
                <p className="flex items-center gap-2.5"><Calendar size={15} className="text-red-500" />{job.start} – {job.end}</p>
                <p className="flex items-center gap-2.5"><MapPin size={15} className="text-red-500" />{job.location}</p>
              </div>
              <div className="mt-auto pt-8">
                <p className="text-xs text-slate-500 mb-2">2026</p>
                <div className="grid grid-cols-12 gap-[3px]">
                  {MONTHS.map((m, i) => {
                    const on = i >= job.startMonth && i < job.startMonth + job.months;
                    return (
                      <motion.span
                        key={m}
                        title={m}
                        className={`h-6 rounded-[3px] ${on ? 'bg-gradient-to-t from-red-700 to-red-400' : 'bg-white/[0.06]'}`}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                        style={{ originY: 1 }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1.5">
                  <span>Jan</span><span>Dec</span>
                </div>
              </div>
            </aside>
            <div className="p-7 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white text-[#06050a] flex items-center justify-center font-heading font-bold text-base shrink-0">
                  {job.initials}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-heading font-semibold text-white leading-tight">{job.role}</h4>
                  <p className="text-sm font-semibold text-red-400 mt-1">{job.company}</p>
                </div>
              </div>
              <div className="mt-8 pl-5 border-l-2 border-red-500">
                <p className="text-xs text-slate-500">Project brief</p>
                <p className="mt-1 text-sm md:text-base font-heading font-semibold text-white leading-snug">{job.project}</p>
              </div>
              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.highlights.map((h, i) => (
                  <li key={h} className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                    <span className="font-heading font-bold text-red-500 text-sm">{i === 0 ? 'Team' : 'Craft'}</span>
                    <p className="mt-2 text-sm text-slate-300 font-light leading-relaxed">{h}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-4 items-start rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/[0.08] to-transparent p-5">
                <BadgeCheck size={28} className="text-amber-400 shrink-0" />
                <div>
                  <p className="text-sm font-heading font-bold text-amber-300">Recognised by the organisation</p>
                  <p className="mt-1 text-sm text-slate-300 font-light leading-relaxed">{job.recognition}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-7">
                {job.focus.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs font-medium text-slate-300 border border-white/10 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
        <div className="mb-8 text-left">
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-white">Education &amp; Credentials</h3>
          <p className="text-sm text-slate-400 mt-1">Degree, certification and diploma behind the work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((e, i) => {
            const Icon = typeIcon[e.type];
            return (
              <motion.article
                key={e.title}
                className="group relative glass-panel rounded-[22px] overflow-hidden text-left flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:border-red-500/40"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.14 }}
              >
                <div className="relative px-6 pt-8 pb-5 bg-gradient-to-br from-red-600/25 via-red-900/10 to-transparent border-b border-white/5">
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-[#06050a] border border-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Icon size={17} className="text-red-400" />{e.type}
                    </span>
                    <span className="font-heading font-semibold text-base text-white/30 group-hover:text-red-400 transition-colors duration-500">&rsquo;{e.year.slice(2)}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-white text-[#06050a] flex items-center justify-center font-heading font-bold text-sm shrink-0">
                      {e.initials}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-base font-heading font-semibold text-white leading-snug">{e.title}</h4>
                      <p className="text-sm font-semibold text-red-400 mt-1 leading-snug">{e.school}</p>
                    </div>
                  </div>

                  <dl className="mt-5 text-xs">
                    <div className="flex items-baseline gap-2">
                      <dt className="text-slate-500 shrink-0">Period</dt>
                      <span className="flex-1 border-b border-dotted border-white/15" />
                      <dd className="text-slate-300 font-medium">{e.period}</dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-xs text-slate-400 font-light leading-relaxed flex-1">{e.focus}</p>

                  {/* score ring */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-4">
                    <div className="relative">
                      <Ring pct={e.pct} delay={0.3 + i * 0.14} />
                      <span className="absolute inset-0 flex items-center justify-center">
                        {e.type === 'Certification'
                          ? <BadgeCheck size={22} className="text-red-400" />
                          : <span className="font-heading font-bold text-base text-white">{e.metric}</span>}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{e.metricLabel}</p>
                      <p className="font-heading font-semibold text-white text-base leading-tight">
                        {e.type === 'Certification' ? e.metric : `${e.metric} ${e.unit}`}
                      </p>
                      {e.type === 'Certification' && <p className="text-xs text-slate-400">{e.unit} programme</p>}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
