import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import {
  ShieldCheck,
  Search,
  Zap,
  Lock,
  EyeOff,
  BarChart3,
  Download,
  Chrome,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  PlayCircle,
  Users,
  ShieldAlert,
  Menu,
  X,
  ChevronUp
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import ramImg from '../ram.png.jpeg';
import shlokImg from '../shlok.jpeg';
import rishiImg from '../rishi.png.jpeg';
import shabnamImg from '../shabnam.png.jpeg';

// --- Components ---

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className={`bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[24px] p-8 shadow-2xl transition-all duration-300 will-change-transform ${className}`}
  >
    {children}
  </motion.div>
);

const SectionReveal = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-200px" }}
    transition={{ duration: 1, ease: "easeOut" }}
    className={`py-32 px-6 relative ${className}`}
  >
    {children}
  </motion.section>
);

const NavItem = ({ href, label, active, onClick }: { href: string, label: string, active: boolean, onClick: () => void }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      onClick();
    }}
    className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 py-2 ${active ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
  >
    {label}
    {active && (
      <motion.div
        layoutId="nav-active"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </a>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar Shrink/Expand Logic
      setIsScrolled(currentScrollY > 50);

      // Scroll Direction for expansion logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Show/Hide Back to Top (30% scroll)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setShowBackToTop((currentScrollY / scrollHeight) > 0.3);

      // Scroll Spy Logic
      const sections = ['home', 'demo', 'benefits', 'developers', 'contact'];
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && currentScrollY >= element.offsetTop - 200) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadExtension = () => {
    alert("ShieldScan V2.0 source is in the /extension folder!");
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'demo', label: 'Demo' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'developers', label: 'Team' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden antialiased scroll-smooth">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      {/* 🧭 Navigation Header */}
      <motion.nav
        animate={{
          height: isScrolled && scrollDirection === 'down' ? 70 : 90,
          backgroundColor: isScrolled ? 'rgba(2, 4, 8, 0.85)' : 'rgba(2, 4, 8, 0)',
          borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 backdrop-blur-2xl border-b transition-colors"
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-emerald-400 transition-all duration-500">
              SHIELDSCAN
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <NavItem
                key={link.id}
                href={`#${link.id}`}
                label={link.label}
                active={activeSection === link.id}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadExtension}
              className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
            >
              <Chrome className="w-4 h-4" /> Install Free
            </motion.button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-[#020408] flex flex-col items-center justify-center p-8 lg:hidden"
          >
            <button
              className="absolute top-8 right-8 p-2 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-2xl font-black uppercase tracking-widest ${activeSection === link.id ? 'text-emerald-500' : 'text-slate-400'}`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={downloadExtension}
                className="mt-8 bg-emerald-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm"
              >
                Add to Chrome
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-[90px]">
        {/* 1️⃣ Hero Section */}
        <section id="home" className="px-6 py-24 min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-10"
              >
                <Zap className="w-3 h-3" /> The Web, Transparent at Last
              </motion.div>
              <h1 className="text-6xl lg:text-[100px] font-black mb-10 leading-[0.95] tracking-tight text-white uppercase italic">
                Unmask the<br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">Digital Void.</span>
              </h1>
              <p className="text-lg lg:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
                ShieldScan is the elite security layer for the ethical web. It uncovers dark patterns and psychological manipulation in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadExtension}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 transition-all"
                >
                  <Chrome className="w-6 h-6" /> Install ShieldScan
                </motion.button>
                <a href="#demo" className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 group transition-colors">
                  Watch the Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Dynamic Glass Cards */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { label: "Trust Score", val: "94/100", icon: BarChart3, color: "emerald", desc: "Live Ethical Audit" },
                { label: "Red Flags", val: "2 Traps", icon: ShieldAlert, color: "orange", desc: "Psychological Manipulation" },
                { label: "Scan Speed", val: "0.8s", icon: Zap, color: "purple", desc: "Neural Engine Sync" }
              ].map((item, i) => (
                <GlassCard key={item.label} delay={0.4 + (i * 0.1)} className="text-left">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 bg-${item.color}-500/10 rounded-2xl`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <span className={`text-[10px] font-black text-${item.color}-500/50 uppercase tracking-widest`}>Real-Time</span>
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">{item.label}</h3>
                  <div className={`text-4xl font-black text-${item.color}-400 mb-2`}>{item.val}</div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* 2️⃣ Video Demo Section */}
        <SectionReveal id="demo" className="bg-white/[0.01]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-20">
              <h2 className="text-4xl lg:text-7xl font-black mb-8 uppercase tracking-tighter italic">Dismantle the<br /><span className="text-emerald-500">Manipulation.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">Watch our neural engine identify and isolate dark patterns in sub-second time.</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative max-w-5xl mx-auto aspect-video bg-slate-900 rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758598304695-1f2f24b464fd?auto=format&fit=crop&q=80&w=1200"
                alt="ShieldScan Demo"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-125 transition-all duration-500">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute bottom-10 left-10">
                <div className="bg-emerald-500/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  Neural Scan Active — v2.0
                </div>
              </div>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { title: "Universal Recognition", desc: "Identifies 50+ deception categories across any DOM structure.", color: "emerald" },
                { title: "Stealth Operation", desc: "Runs 100% locally with zero latency impact to your browsing.", color: "blue" },
                { title: "Deep Trace Audit", desc: "Logs every attempt at manipulation for your private review.", color: "purple" }
              ].map((feat, i) => (
                <div key={feat.title} className="text-left group">
                  <div className={`h-1 w-12 bg-${feat.color}-500/30 mb-6 group-hover:w-full transition-all duration-500`} />
                  <h4 className="text-lg font-black text-white uppercase mb-2">{feat.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* 3️⃣ Benefits Section */}
        <SectionReveal id="benefits">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter italic leading-none mb-6">Designed for<br /><span className="text-emerald-500">Pure Integrity.</span></h2>
                <p className="text-slate-400 font-medium text-lg">We didn't just build a scanner. We built a digital immune system.</p>
              </div>
              <div className="flex gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center">
                  <div className="text-2xl font-black text-white">50K+</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Users</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center">
                  <div className="text-2xl font-black text-white">1M+</div>
                  <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Traps Exposed</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Truth Layer", desc: "Real-time overlay that unmasks hidden fees and subscriptions.", icon: ShieldCheck, color: "emerald" },
                { title: "Domain Audit", desc: "Instant trust score for any website, verified by open heuristics.", icon: BarChart3, color: "blue" },
                { title: "Family Shield", desc: "Protects children from manipulative 'kids-safe' app patterns.", icon: Users, color: "purple" },
                { title: "AI Neutralizer", desc: "Detects machine-generated sludge designed to trap attention.", icon: Zap, color: "orange" }
              ].map((benefit, i) => (
                <GlassCard key={benefit.title} delay={i * 0.1}>
                  <div className={`w-14 h-14 bg-${benefit.color}-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className={`w-7 h-7 text-${benefit.color}-400`} />
                  </div>
                  <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tighter italic">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* 4️⃣ Team Section */}
        <SectionReveal id="developers" className="bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black mb-8 uppercase tracking-tighter italic">The Humans<br /><span className="text-emerald-500">Behind the Code.</span></h2>
              <p className="text-slate-400 font-medium text-lg">Honest tech built by people who believe in the sovereign user.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { name: "Ram Sai Yadav", role: "Visionary Founder", quote: "Protect the user, save the web.", img: ramImg },
                { name: "Shlok Karn", role: "Lead Architect", quote: "Systems should serve sovereignty.", img: shlokImg },
                { name: "S Abhinav Rishi", role: "Neural Security", quote: "Expose the deception.", img: rishiImg },
                { name: "Shabnam Nisha", role: "Human-Centric UX", quote: "Design is a moral act.", img: shabnamImg }
              ].map((dev, i) => (
                <div key={dev.name} className="text-center group">
                  <div className="relative w-48 h-48 mx-auto mb-10 overflow-hidden rounded-[40px] border-2 border-white/5 p-2">
                    <ImageWithFallback
                      src={dev.img}
                      alt={dev.name}
                      className="w-full h-full rounded-[32px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{dev.name}</h4>
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">{dev.role}</div>
                  <p className="text-xs italic text-slate-600 font-bold">"{dev.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* 5️⃣ Contact Section */}
        <SectionReveal id="contact">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-[60px] p-16 text-center backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32 transition-all duration-700 group-hover:scale-150" />
              <h2 className="text-4xl lg:text-6xl font-black mb-10 text-white uppercase tracking-tighter italic">Join the Mission</h2>
              <p className="text-slate-400 mb-14 max-w-lg mx-auto font-medium text-lg leading-relaxed">
                ShieldScan is more than a tool. It's an open-source movement for digital sovereignty. Join us in building the ultimate defense.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: Mail, label: "Intelligence" },
                  { icon: Github, label: "Core Repo" },
                  { icon: Twitter, label: "Connect" },
                  { icon: Linkedin, label: "Partner" }
                ].map((social) => (
                  <motion.button
                    key={social.label}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-3xl transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      {/* 6️⃣ Footer */}
      <footer className="py-24 px-6 border-t border-white/5 relative z-10 bg-[#020408]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              <span className="font-black text-2xl tracking-tighter text-white">SHIELDSCAN</span>
            </div>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] leading-relaxed">
              Premium Neural Defense<br />for the Ethical Web.
            </p>
          </div>

          <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <div className="flex flex-col gap-4">
              <a href="#home" className="hover:text-emerald-400">Home</a>
              <a href="#demo" className="hover:text-emerald-400">Mission</a>
              <a href="#benefits" className="hover:text-emerald-400">Benefits</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#developers" className="hover:text-emerald-400">Team</a>
              <a href="#contact" className="hover:text-emerald-400">Contact</a>
              <button onClick={downloadExtension} className="text-emerald-500 hover:text-emerald-400 text-left">Install</button>
            </div>
          </div>

          <div className="text-center md:text-right flex flex-col justify-center">
            <div className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-2">SHIELDSCAN v2.0 © 2026</div>
            <div className="text-[9px] font-black text-emerald-500/40 uppercase tracking-[0.4em]">Sovereignty Powered by Transparency</div>
          </div>
        </div>
      </footer>

      {/* 👆 Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[100] p-5 bg-emerald-500 text-white rounded-full shadow-[0_15px_35px_rgba(16,185,129,0.5)] border border-white/20 backdrop-blur-md transition-all active:scale-95"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
