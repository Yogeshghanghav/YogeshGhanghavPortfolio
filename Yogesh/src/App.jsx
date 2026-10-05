import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
const PortfolioCanvas = lazy(() => import('./components/PortfolioCanvas'));
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { 
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  
  useEffect(() => {
    const onScroll = () => { 
      if (menuOpen) setMenuOpen(false); 
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  return (
    <>
      
      <Preloader onComplete={() => setPreloaderDone(true)} />
      
      
      <Suspense fallback={null}>
        <PortfolioCanvas scrollProgress={scrollProgress} />
      </Suspense>

      
      
      <div 
        className={`w-full min-h-screen bg-transparent transition-opacity duration-1000 ${
          preloaderDone ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
        }`}
      >
        <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <Navbar 
          activeSection={activeSection} 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
        />
        
        
        <main className="w-full flex flex-col relative z-20 bg-transparent">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}
