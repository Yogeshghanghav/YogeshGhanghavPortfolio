import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const categories = [
    { key: 'programming', label: 'Programming Languages' },
    { key: 'frontend', label: 'Frontend Technologies' },
    { key: 'backend', label: 'Backend & APIs' },
    { key: 'database', label: 'Database Architectures' },
    { key: 'cloud', label: 'Cloud & AI Integration' },
    { key: 'tools', label: 'Development & Tools' }
  ];

  return (
    <section 
      id="skills" 
      className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10"
    >
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">EXPERTISE</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Technical Stack<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>

        <div className="flex flex-col gap-8 w-full">
          {categories.map((cat, catIdx) => {
            const isRight = catIdx % 2 === 0; 
            return (
              <div 
                key={cat.key} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                
                <div className={`lg:col-span-7 ${isRight ? 'lg:order-2' : 'lg:order-1'}`}>
                  <motion.div
                    className="glass-panel p-5 rounded-2xl border border-red-500/5 hover:border-red-500/20 transition-all duration-300"
                    initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-3.5">
                      {cat.label}
                    </h3>
                    
                    
                    <div className="flex flex-wrap gap-2.5">
                      {skillsData[cat.key].map((skill) => (
                        <div
                          key={skill.name}
                          className="group flex items-center gap-4 px-3 py-1.5 bg-white/5 border border-white/5 hover:border-red-500/35 rounded-xl transition-all duration-300 hover:bg-red-500/5 hover:shadow-[0_0_15px_rgba(232,0,13,0.1)]"
                        >
                          <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-600 group-hover:bg-red-500 transition-colors"
                                style={{ width: `${skill.pct}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-mono font-bold text-slate-500 group-hover:text-red-500 transition-colors">
                              {skill.pct}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                
                <div className={`hidden lg:block lg:col-span-5 ${isRight ? 'lg:order-1' : 'lg:order-2'} pointer-events-none select-none h-[120px]`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
