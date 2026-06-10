import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, menuOpen, setMenuOpen }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel border-b border-red-500/10' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        
        <div className="text-xl md:text-2xl font-heading font-extrabold tracking-wider text-white select-none">
          YG<span className="text-red-500 font-black">.</span>
        </div>

        
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${
                  activeSection === link.id
                    ? 'text-red-500 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_rgba(232,0,13,0.7)] rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-block px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white border border-red-500/20 hover:border-red-500 rounded-lg hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(232,0,13,0.3)] transition-all duration-300"
          >
            Hire Me
          </a>

          
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      
      <div
        className={`fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] glass-panel z-40 border-l border-red-500/10 transition-transform duration-300 md:hidden flex flex-col p-6 gap-6 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`text-xs font-bold uppercase tracking-widest py-3 border-b border-white/5 transition-colors ${
              activeSection === link.id ? 'text-red-500' : 'text-slate-400'
            }`}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="mt-4 px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-white bg-red-600 rounded-lg shadow-[0_0_15px_rgba(232,0,13,0.35)] hover:bg-red-500 transition-all"
        >
          Hire Me
        </a>
      </div>
    </>
  );
}