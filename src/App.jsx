import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Download, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // OPTIMIZATION: Use Refs for animations to bypass React re-renders (GPU Heavy)
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Optimized Mouse Movement (Direct DOM manipulation)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Move Blob 1 (Slow)
      if (blob1Ref.current) {
        blob1Ref.current.animate({
          transform: `translate(${clientX * 0.05}px, ${clientY * 0.05}px)`
        }, { duration: 3000, fill: "forwards" });
      }
      
      // Move Blob 2 (Fast/Parallax)
      if (blob2Ref.current) {
        blob2Ref.current.animate({
          transform: `translate(${clientX * 0.08}px, ${clientY * 0.08}px)`
        }, { duration: 4000, fill: "forwards" }); 
      }
    };

    // 3. Scroll Spy Logic
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // NOTE: Replace these with your actual EmailJS credentials
      emailjs.send(
        'service_m5eewjg', 
        'template_kqxk603', 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        }, 
        'lKHBP3Ub-aotI5yh2'
      ).then(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }).catch((err) => {
        alert('Failed to send. Please try again.');
        console.error(err);
      });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; 
    link.download = 'Anuj_Patil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [
    {
      title: 'Agent Sentinel',
      description: 'Autonomous AI agent detecting and neutralizing viral misinformation in real-time for government and enterprise use.',
      role: 'Lead Backend Engineer',
      tech: ['Python', 'FastAPI', 'RoBERTa', 'GDELT API'],
      gradient: 'from-blue-400 to-cyan-400',
      link: 'https://github.com/AnujPatil05/Agent-Sentinel'
    },
    {
      title: 'AI Tutor with Voice Cloning',
      description: 'Custom-trained AI tutor with voice cloning achieving 95% accuracy on course-specific questions.',
      role: 'Full-Stack Developer',
      tech: ['Python', 'RAG', 'LoRA', 'ChromaDB', 'XTTS'],
      gradient: 'from-purple-400 to-pink-400',
      link: 'https://github.com/AnujPatil05/AI-Tutor-Voice'
    },
    {
      title: 'DevConnect Platform',
      description: 'Campus placement and academic resource sharing platform with comprehensive full-stack implementation.',
      role: 'Solo Developer',
      tech: ['Spring Boot', 'React', 'PostgreSQL'],
      gradient: 'from-green-400 to-emerald-400',
      link: 'https://github.com/AnujPatil05/DevConnect'
    },
    {
      title: 'Health Food AI Assistant',
      description: 'Intelligent AI assistant analyzing medical conditions against 500+ food items for personalized recommendations.',
      role: 'Solo Developer',
      tech: ['JavaScript', 'AI Integration', 'Healthcare'],
      gradient: 'from-orange-400 to-red-400',
      link: 'https://github.com/AnujPatil05/health-food-ai'
    },
    {
      title: 'Concurrent Web Crawler',
      description: 'High-performance multithreaded web crawler scanning 1,000+ links per minute for test automation.',
      role: 'Solo Developer',
      tech: ['Java', 'Multithreading', 'Web Scraping'],
      gradient: 'from-indigo-400 to-blue-400',
      link: 'https://github.com/AnujPatil05/Concurrent-Crawler'
    },
    {
      title: 'Password Manager CLI',
      description: 'Secure command-line password manager using AES encryption and efficient data structures.',
      role: 'Solo Developer',
      tech: ['Java', 'AES Encryption', 'Data Structures'],
      gradient: 'from-pink-400 to-rose-400',
      link: 'https://github.com/AnujPatil05/Password-Manager'
    }
  ];

  const currentActivities = [
    '✦ building intelligent AI systems',
    '✦ exploring autonomous agent architectures',
    '✦ learning how to reduce API latency at scale',
    '✦ experimenting with CDNs, Anycast, and edge caching',
    '✦ studying real‑world strategies for handling millions of requests'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50 text-gray-800 relative overflow-hidden font-sans">
      
      {/* 1. OPTIMIZED BACKGROUND (GPU Accelerated) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          ref={blob1Ref}
          className="absolute left-0 top-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl will-change-transform"
        />
        <div 
          ref={blob2Ref}
          className="absolute right-0 bottom-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl will-change-transform"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo */}
            <div className="bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  AP
                </div>
              </div>
            </div>

            {/* Nav Pills */}
            <div className="flex bg-white/80 backdrop-blur-md rounded-full px-1 sm:px-1.5 py-1 sm:py-1.5 shadow-lg border border-gray-200/50">
              {['home', 'work', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-2 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
                    activeSection === item ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {activeSection === item && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gray-900 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{item}</span>
                </button>
              ))}
            </div>

            {/* Github Doodle & Button */}
            <div className="relative group">
              <div className="absolute hidden lg:block -left-28 top-2 w-28 pointer-events-none opacity-80 rotate-[-6deg]">
                <div className="relative flex flex-col items-center">
                   <svg width="60" height="40" viewBox="0 0 100 60" className="absolute -right-2 -top-4">
                     <path d="M 10 40 Q 40 10 90 20" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M 75 10 L 90 20 L 80 32" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                   <span style={{ fontFamily: '"Caveat", cursive' }} className="text-2xl font-bold text-gray-800 mt-6 mr-4">github</span>
                </div>
              </div>

              <a href="https://github.com/AnujPatil05" target="_blank" rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-md rounded-full p-2 sm:p-3 shadow-lg border border-gray-200/50 hover:scale-110 transition-transform block">
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200/50">
              <span className="relative flex h-3 w-3 mr-2 sm:mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Available for opportunities</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                Hi, I'm Anuj!
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light max-w-3xl leading-relaxed">
                I'm a software developer and AI Practitioner based out of Navi Mumbai.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200/50 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">what you'll find me doing</h3>
              <div className="space-y-2 sm:space-y-3">
                {currentActivities.map((activity, index) => (
                  <p key={index} className="text-gray-600 text-base sm:text-lg font-light">{activity}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <button onClick={() => scrollToSection('work')} className="group bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
                View My Work <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={handleDownloadResume} className="bg-white/80 backdrop-blur-md text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:scale-105 transition-all shadow-lg border border-gray-200/50 flex items-center justify-center gap-2">
                <Download size={20} /> Resume
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/AnujPatil05" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors"><Github size={24} /></a>
              <a href="https://linkedin.com/in/anujpatil" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors"><Linkedin size={24} /></a>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors"><Mail size={24} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Selected Work</h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light">Projects that challenge and inspire me</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${project.gradient} rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all">{project.title}</h3>
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">{project.role}</p>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{tech}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-900 font-medium group-hover:gap-3 transition-all text-sm sm:text-base">
                  View Project <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">About Me</h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>I'm a final year B.Tech Computer Engineering student at Pillai College of Engineering, passionate about designing autonomous AI agents and multi-agent systems.</p>
                <p>My work focuses on building intelligent systems that solve real-world problems—from misinformation detection to personalized AI tutors.</p>
                <p>With a strong foundation in Python, Java, and modern web technologies, I'm constantly learning and pushing the boundaries of what's possible with AI.</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-gray-200/50">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Education</h3>
                <p className="text-gray-700 font-medium text-sm sm:text-base">B.Tech in Computer Engineering</p>
                <p className="text-gray-600 text-xs sm:text-sm">Pillai College of Engineering</p>
                <p className="text-gray-500 text-xs sm:text-sm">2022 - 2026 • CGPA: 7.24</p>
              </div>
            </div>

            <div className="relative order-first md:order-last">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-3xl p-8 sm:p-12 text-center">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">👨‍💻</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Anuj Patil</h3>
                  <p className="text-sm sm:text-base text-gray-600">Software Developer & AI Practitioner</p>
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-left space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-3 text-gray-600 text-sm sm:text-base">
                      <MapPin size={18} className="text-blue-500 flex-shrink-0" />
                      <span>Navi Mumbai, India</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail size={18} className="text-purple-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm break-all">anuj05patil@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200/50">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Open to opportunities</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">Let's Work Together</h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              I'm actively seeking internships and entry-level roles. Let's build something amazing together.
            </p>

            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-200/50 max-w-2xl mx-auto">
              <div className="space-y-3 sm:space-y-4">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-900 text-sm sm:text-base" />
                <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-gray-900 text-sm sm:text-base" />
                <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-2xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none text-gray-900 text-sm sm:text-base" />
                <button onClick={handleSubmit} className="w-full bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium hover:scale-105 transition-all shadow-lg text-sm sm:text-base">
                  Send Message
                </button>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 sm:gap-6 pt-6 sm:pt-8">
               <a href="https://github.com/AnujPatil05" target="_blank" className="bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-full shadow-lg border border-gray-200/50 hover:scale-110 transition-transform"><Github size={20} className="sm:w-6 sm:h-6" /></a>
               <a href="https://linkedin.com/in/anujpatil" target="_blank" className="bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-full shadow-lg border border-gray-200/50 hover:scale-110 transition-transform"><Linkedin size={20} className="sm:w-6 sm:h-6" /></a>
               <a href="mailto:anuj05patil@gmail.com" className="bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-full shadow-lg border border-gray-200/50 hover:scale-110 transition-transform"><Mail size={20} className="sm:w-6 sm:h-6" /></a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200/50 bg-white/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            © 2025 Anuj Patil • Made with <span className="text-red-500">desperateness</span> 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;