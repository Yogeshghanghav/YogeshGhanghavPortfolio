import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Server, Database, Cloud, Wrench, Rocket, Search } from 'lucide-react';
import { skillsData, projects } from '../data/portfolioData';

/* layers, drawn top to bottom like an architecture diagram */
const layers = [
  { key: 'frontend', label: 'Frontend', note: 'What users see', icon: Layout },
  { key: 'backend', label: 'Backend & APIs', note: 'Logic and real-time', icon: Server },
  { key: 'database', label: 'Databases', note: 'Persistence', icon: Database },
  { key: 'cloud', label: 'Cloud & AI', note: 'Serverless and intelligence', icon: Cloud },
  { key: 'tools', label: 'Tools', note: 'Workflow', icon: Wrench },
  { key: 'programming', label: 'Languages', note: 'Foundation', icon: Code2 },
];

const levelOf = (pct) => (pct >= 88 ? 3 : pct >= 80 ? 2 : 1);
const levelName = ['', 'Working knowledge', 'Proficient', 'Advanced'];

/* skills that are used in a project without appearing as a tag */
const alias = {
  JavaScript: ['React.js', 'Node.js'],
  'HTML5/CSS3': ['React.js'],
  'REST APIs': ['Express.js', 'API Gateway'],
  'AWS SAM CLI': ['AWS Lambda'],
  Git: ['React.js'],
  GitHub: ['React.js'],
};

const Dots = ({ n }) => (
  <span className="flex gap-1" aria-hidden="true">
    {[1, 2, 3].map((i) => (
      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= n ? 'bg-red-500' : 'bg-white/15'}`} />
    ))}
  </span>
);

export default function Skills() {
  const [selected, setSelected] = useState({ ...skillsData.frontend[0], cat: 'frontend' });
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const total = Object.values(skillsData).reduce((a, l) => a + l.length, 0);
  const lvl = levelOf(selected.pct);
  const layer = layers.find((l) => l.key === selected.cat);

  const names = [selected.name, ...(alias[selected.name] || [])].map((n) => n.toLowerCase());
  const usedIn = projects.filter((p) => p.tags.some((t) => names.includes(t.toLowerCase())));

  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10">
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">EXPERTISE</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Technical Stack<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
          <p className="text-sm text-slate-400 font-light mt-5 max-w-xl mx-auto">
            The full stack, drawn as layers. Select any skill to see where I&rsquo;ve applied it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search skills"
                  aria-label="Search skills"
                  className="w-full pl-9 pr-3 py-2.5 bg-black/30 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-2"><Dots n={3} /> Advanced</span>
                <span className="flex items-center gap-2"><Dots n={2} /> Proficient</span>
                <span className="flex items-center gap-2"><Dots n={1} /> Working</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {layers.map(({ key, label, note, icon: Icon }, li) => (
                <motion.div
                  key={key}
                  className="glass-panel rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: li * 0.06 }}
                >
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-red-500 to-red-900/20" />

                  <div className="sm:w-48 shrink-0 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-red-500/10 text-red-500"><Icon size={17} /></span>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillsData[key].map((s) => {
                      const isSel = selected.name === s.name && selected.cat === key;
                      const dim = q && !s.name.toLowerCase().includes(q);
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelected({ ...s, cat: key })}
                          aria-pressed={isSel}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all duration-300 ${
                            isSel
                              ? 'bg-red-500/15 border-red-500/60 text-white shadow-[0_0_18px_rgba(232,0,13,0.2)]'
                              : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-red-500/40 hover:text-white'
                          } ${dim ? 'opacity-25' : ''}`}
                        >
                          {s.name}
                          <Dots n={levelOf(s.pct)} />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-500">{total} skills across {layers.length} layers.</p>
          </div>

          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.cat + selected.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-2xl p-6 border border-red-500/15"
                >
                  <p className="text-xs text-slate-500">{layer.label}</p>
                  <h3 className="text-xl font-heading font-semibold text-white mt-1">{selected.name}</h3>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex gap-1 flex-1" aria-hidden="true">
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= lvl ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-slate-300">{levelName[lvl]}</span>
                  </div>

                  <h4 className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-7 mb-3">
                    <Rocket size={13} className="text-red-500" /> Where I&rsquo;ve applied it
                  </h4>

                  {usedIn.length ? (
                    <ul className="flex flex-col gap-3">
                      {usedIn.map((p) => (
                        <li key={p.title}>
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-red-500/40 transition-colors"
                          >
                            <span className="block text-sm font-semibold text-white">{p.title}</span>
                            <span className="block text-xs text-slate-400 mt-1">{p.subtitle}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      Part of my everyday toolkit across personal projects, my internship at Creazione Software and
                      Java Full Stack training at Spark IT Institute.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
