import { useEffect } from 'react';

export default function use3DTilt(ref, options = {}) {
  const { max = 15, perspective = 800, scale = 1.03, speed = 400 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = `transform ${speed}ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow ${speed}ms ease`;
    el.style.transformStyle = 'preserve-3d';

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      
      const rX = -(mouseY / (height / 2)) * max;
      const rY = (mouseX / (width / 2)) * max;

      el.style.transform = `perspective(${perspective}px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      
      
      const shadowX = -rY * 0.8;
      const shadowY = rX * 0.8;
      el.style.boxShadow = `${shadowX}px ${shadowY}px 25px rgba(232, 0, 13, 0.15), 0 10px 30px rgba(0, 0, 0, 0.5)`;
    };

    const handleMouseEnter = () => {
      el.style.transition = 'none';
    };

    const handleMouseLeave = () => {
      el.style.transition = `transform ${speed}ms ease, box-shadow ${speed}ms ease`;
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.boxShadow = '';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, max, perspective, scale, speed]);
}
