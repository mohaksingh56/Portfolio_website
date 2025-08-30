import React from 'react';

import { FaLinkedin, FaGithub, FaEnvelope, FaKaggle } from 'react-icons/fa';
// Optionally import a small animated accent or 3D card
// import { ParticleSystem } from '../components/StarField';

const HeroSectionV3: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-dark-primary text-white px-4">
      {/* Navbar */}
      <nav className="w-full flex justify-center py-8 mb-8">
        <ul className="flex gap-8 text-lg text-text-muted">
          <li><a href="#home" className="hover:text-primary-teal transition">home</a></li>
          <li><a href="#projects" className="hover:text-primary-teal transition">projects</a></li>
          <li><a href="#experience" className="hover:text-primary-teal transition">experience</a></li>
          <li><a href="#contact" className="hover:text-primary-teal transition">contact</a></li>
        </ul>
      </nav>

      {/* Main Headline */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        hey there! I'm Mohak Singh,<br />
        <span className="text-primary-teal">an AI developer & data scientist</span>
        <span className="inline-block ml-2 animate-pulse">✨</span>
      </motion.h1>

      {/* Subheadline & Contact */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl text-text-secondary mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <a href="mailto:singh.mohak@outlook.com" className="flex items-center gap-2 hover:text-primary-teal transition">
          <FaEnvelope /> singh.mohak@outlook.com
        </a>
        <span className="hidden md:inline-block">|</span>
        <a href="https://linkedin.com/in/mohak-singh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-blue transition">
          <FaLinkedin /> connect on linkedin
        </a>
        <span className="hidden md:inline-block">|</span>
        <a href="https://github.com/mohak-singh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary-green transition">
          <FaGithub /> github
        </a>
      </motion.div>

      {/* Current Work Badge */}
      <motion.div
        className="flex items-center gap-2 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-sm text-green-400">working at <span className="font-semibold text-green-300">Lentit</span></span>
      </motion.div>

      {/* Animated Accent or 3D Card Preview */}
      <motion.div
        className="mt-4 mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {/* Replace below with a 3D card or animated accent if desired */}
        <div className="w-64 h-40 bg-gradient-to-br from-primary-teal via-primary-blue to-secondary-green rounded-xl shadow-lg flex items-center justify-center text-2xl font-bold text-white">
          AI • Data • Science
        </div>
      </motion.div>

      {/* Footer or Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-sm">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSectionV3;
