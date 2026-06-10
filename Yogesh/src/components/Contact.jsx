import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.submit) {
      setErrors(prev => ({ ...prev, [name]: '', submit: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_p8tshsn'; 
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x1u3vzo'; 
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Yogesh Ghanghav'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#e8000d', '#ff2a3b', '#f59e0b', '#ffffff']
        });
        
        setTimeout(() => setStatus('idle'), 6000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
        setErrors(prev => ({ ...prev, submit: 'Failed to transmit message. Please check connection or try again later.' }));
        setTimeout(() => setStatus('idle'), 6000);
      });
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto z-10 relative">
        
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">COLLABORATION</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Get In Touch<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left">
          <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/5">
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
              <Mail size={16} />
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Email Address</h4>
              <a href="mailto:yogeshghanghav77@gmail.com" className="text-xs font-bold text-slate-300 hover:text-white transition-colors mt-0.5 block">
                yogeshghanghav77@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/5">
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
              <Phone size={16} />
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Call / WhatsApp</h4>
              <a href="tel:+918459392130" className="text-xs font-bold text-slate-300 hover:text-white transition-colors mt-0.5 block">
                +91 8459392130
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/5">
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
              <MapPin size={16} />
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Location</h4>
              <span className="text-xs font-bold text-slate-300 mt-0.5 block">
                Pune, Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        
        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-red-500/10 max-w-2xl mx-auto text-left relative z-20">
          <h3 className="text-lg md:text-xl font-heading font-extrabold text-white mb-6">
            Send a Message
          </h3>

          {status === 'success' ? (
            <motion.div 
              className="flex flex-col items-center justify-center py-10 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle2 size={56} className="text-red-500 mb-4 animate-bounce" />
              <h4 className="text-base font-heading font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Thank you. Yogesh Ghanghav will review your request and get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`px-4 py-2.5 bg-black/30 border rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.name ? 'border-red-500/50' : 'border-white/5'
                  }`}
                />
                {errors.name && <span className="text-[9px] text-red-400 font-semibold mt-1">{errors.name}</span>}
              </div>

              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className={`px-4 py-2.5 bg-black/30 border rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.email ? 'border-red-500/50' : 'border-white/5'
                  }`}
                />
                {errors.email && <span className="text-[9px] text-red-400 font-semibold mt-1">{errors.email}</span>}
              </div>

              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Job opportunity / Project inquiry"
                  className={`px-4 py-2.5 bg-black/30 border rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors ${
                    errors.subject ? 'border-red-500/50' : 'border-white/5'
                  }`}
                />
                {errors.subject && <span className="text-[9px] text-red-400 font-semibold mt-1">{errors.subject}</span>}
              </div>

              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400" htmlFor="message">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your product team or project requirements..."
                  className={`px-4 py-2.5 bg-black/30 border rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors resize-none ${
                    errors.message ? 'border-red-500/50' : 'border-white/5'
                  }`}
                />
                {errors.message && <span className="text-[9px] text-red-400 font-semibold mt-1">{errors.message}</span>}
              </div>

              {errors.submit && (
                <div className="text-[10px] text-red-400 font-bold block bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 mt-2">
                  {errors.submit}
                </div>
              )}

              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 mt-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_15px_rgba(232,0,13,0.2)] disabled:opacity-50 transition-all duration-300 cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Send Message <Send size={10} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}