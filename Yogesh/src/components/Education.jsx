import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experienceTimeline } from '../data/portfolioData';

export default function Education() {
  return (
    <section
      id="education"
      className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden border-b border-red-600/10"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">JOURNEY</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Education & Achievements<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>

        
        <div className="relative border-l-2 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[2px] md:before:bg-gradient-to-b md:before:from-red-600 md:before:to-red-950/20 pl-8 md:pl-0">
          
          {experienceTimeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.title + index} 
                className="relative mb-12 md:mb-16 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full"
              >
                
                
                <div className={`hidden md:block w-[45%] ${isEven ? 'order-1' : 'order-3'}`} />

                
                <div className="absolute left-[-42px] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-red-500/30 bg-bg-space shadow-[0_0_15px_rgba(232,0,13,0.3)]">
                  {item.type === 'work' ? (
                    <Briefcase size={16} className="text-red-500" />
                  ) : (
                    <GraduationCap size={18} className="text-red-400" />
                  )}
                </div>

                
                <motion.div
                  className={`w-full md:w-[45%] glass-panel p-6 rounded-2xl border border-white/5 relative glass-panel-hover text-left ${
                    isEven ? 'order-3 md:text-left' : 'order-1 md:text-left'
                  }`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  
                  <span className="inline-block px-2.5 py-1 text-[9px] font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 rounded-md mb-3">
                    {item.year}
                  </span>

                  <h3 className="text-base sm:text-lg font-heading font-extrabold text-white">
                    {item.title}
                  </h3>
                  
                  <h4 className="text-xs font-semibold text-slate-400 tracking-wide mt-1">
                    {item.subtitle}
                  </h4>
                  
                  <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}