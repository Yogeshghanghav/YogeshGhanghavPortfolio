import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Copy, Check, Clock, Zap, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

const REASONS = ['Job Opportunity', 'Freelance Project', 'Collaboration', 'Just Saying Hi'];

function useLocalTime(timeZone) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-IN', { timeZone, hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', reason: REASONS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime('Asia/Kolkata');

  const copyEmail = () => {
    navigator.clipboard.writeText('yogeshghanghav77@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.submit) setErrors((prev) => ({ ...prev, [name]: '', submit: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Portfolio inquiry — ${formData.reason}`;
    const publicKeyMissing = !import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKeyMissing) {
      const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
      window.location.href = `mailto:yogeshghanghav77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_p8tshsn';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x1u3vzo';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject,
      message: formData.message,
      to_name: 'Yogesh Ghanghav',
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', reason: REASONS[0], message: '' });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#e8000d', '#ff2a3b', '#f59e0b', '#ffffff'],
        });
        setTimeout(() => setStatus('idle'), 6000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
        setErrors((prev) => ({ ...prev, submit: 'Failed to send. Please try again or email me directly.' }));
        setTimeout(() => setStatus('idle'), 6000);
      });
  };

  const row = 'flex items-center gap-4 px-5 py-3.5 border-b border-white/10 focus-within:bg-white/[0.03] transition-colors';
  const lab = 'w-16 shrink-0 text-xs text-slate-500';
  const inp = 'flex-1 min-w-0 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none';

  const channels = [
    { icon: Phone, label: 'Phone', value: '+91 84593 92130', href: 'tel:+918459392130' },
    { icon: Linkedin, label: 'LinkedIn', value: 'yogesh-ghanghav', href: 'https://www.linkedin.com/in/yogesh-ghanghav-389054296', external: true },
    { icon: Github, label: 'GitHub', value: 'Yogeshghanghav', href: 'https://github.com/Yogeshghanghav', external: true },
  ];

  return (
    <section id="contact" className="relative w-full py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">COLLABORATION</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-1">
            Let's Build Something<span className="text-red-500">.</span>
          </h2>
          <div className="w-12 h-[2px] bg-red-600 mx-auto mt-4" />
          <p className="text-sm text-slate-400 font-light mt-5 max-w-lg mx-auto">
            Open to full-time roles and freelance work. Send a note and I&rsquo;ll reply personally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Available for work
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Clock size={12} className="text-red-500" /> {localTime} IST
              </span>
            </div>

            <h3 className="mt-6 text-xl md:text-2xl font-heading font-semibold text-white leading-snug">
              Have a role, a project or an idea? Let&rsquo;s talk.
            </h3>
            <p className="mt-2 text-sm text-slate-400 font-light flex items-center gap-2">
              <Zap size={14} className="text-amber-400" /> Usually replies within 24 hours
            </p>

            <div className="mt-8 border-t border-white/10">
              <button onClick={copyEmail} className="group w-full flex items-center gap-4 py-4 border-b border-white/10 text-left cursor-pointer">
                <span className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"><Mail size={16} /></span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs text-slate-500">Email</span>
                  <span className="block text-sm font-medium text-slate-100 truncate">yogeshghanghav77@gmail.com</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-white transition-colors">
                  {copied ? <><Check size={14} className="text-emerald-400" /> Copied</> : <><Copy size={14} /> Copy</>}
                </span>
              </button>

              {channels.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 py-4 border-b border-white/10"
                >
                  <span className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"><Icon size={16} /></span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block text-sm font-medium text-slate-100 truncate">{value}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}

              <div className="flex items-center gap-4 py-4 border-b border-white/10">
                <span className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"><MapPin size={16} /></span>
                <span>
                  <span className="block text-xs text-slate-500">Based in</span>
                  <span className="block text-sm font-medium text-slate-100">Pune, Maharashtra, India</span>
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="glass-panel rounded-2xl overflow-hidden text-left relative z-20 border border-red-500/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.04] border-b border-white/10">
              <span className="flex gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <i className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <i className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              </span>
              <span className="text-xs text-slate-400">New message</span>
            </div>

            {status === 'success' ? (
              <motion.div
                className="flex flex-col items-center justify-center py-20 px-6 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <CheckCircle2 size={52} className="text-red-500 mb-4" />
                <h4 className="text-lg font-heading font-semibold text-white">Message sent</h4>
                <p className="text-sm text-slate-400 max-w-sm mt-1.5">
                  Thanks for reaching out. I&rsquo;ll get back to you within a day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={row}>
                  <span className={lab}>To</span>
                  <span className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-red-500/10 border border-red-500/25 text-red-300 rounded-full">Yogesh Ghanghav</span>
                  </span>
                </div>

                <div className={`${row} items-start`}>
                  <span className={`${lab} pt-1.5`}>Topic</span>
                  <div className="flex flex-wrap gap-2">
                    {REASONS.map((r) => (
                      <button
                        type="button"
                        key={r}
                        aria-pressed={formData.reason === r}
                        onClick={() => setFormData((prev) => ({ ...prev, reason: r }))}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer ${
                          formData.reason === r
                            ? 'bg-red-500/15 border-red-500/60 text-white'
                            : 'bg-transparent border-white/10 text-slate-400 hover:border-red-500/40 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className={row}>
                    <span className={lab}>Name</span>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" className={inp} />
                  </label>
                  {errors.name && <p className="px-5 pt-2 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={row}>
                    <span className={lab}>Email</span>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inp} />
                  </label>
                  {errors.email && <p className="px-5 pt-2 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div className="px-5 pt-4 pb-2">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message" name="message" rows={6} maxLength={500}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell me about your role, project or idea..."
                    className="w-full bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                {errors.submit && (
                  <div className="mx-5 mb-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                    {errors.submit}
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/10 bg-white/[0.02]">
                  <span className="text-xs text-slate-600 font-mono">{formData.message.length}/500</span>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_20px_rgba(232,0,13,0.25)] disabled:opacity-50 transition-all duration-300 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>Send message <Send size={14} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
