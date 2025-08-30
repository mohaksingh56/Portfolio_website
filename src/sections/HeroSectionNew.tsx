import React from 'react';
import { motion } from 'framer-motion';
import Advanced3DBackground from '../components/3d/Advanced3DBackground';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced 3D Background */}
      <div className="absolute inset-0">
        <Advanced3DBackground />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/40 via-dark-primary/60 to-dark-primary/80"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary-teal via-primary-blue to-secondary-green bg-clip-text text-transparent">
              Mohak Singh
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-8 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            AI Engineer & Data Scientist
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Building next-generation AI systems that transform healthcare, energy, and enterprise platforms
            with cutting-edge machine learning and computer vision technologies.
          </motion.p>
          
          {/* Key Achievements */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary-teal mb-2">96.7%</div>
              <div className="text-sm text-text-muted">ASD Detection Accuracy</div>
              <div className="text-xs text-text-secondary mt-1">NeuroVision Transformer</div>
            </div>
            
            <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary-green/20 hover:border-secondary-green/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-secondary-green mb-2">90%</div>
              <div className="text-sm text-text-muted">Development Time Saved</div>
              <div className="text-xs text-text-secondary mt-1">AutoML Platform</div>
            </div>
            
            <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-accent-amber/20 hover:border-accent-amber/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-accent-amber mb-2">#1</div>
              <div className="text-sm text-text-muted">Smart India Hackathon</div>
              <div className="text-xs text-text-secondary mt-1">National Champion</div>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-blue text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-teal/25 backdrop-blur-sm"
            >
              <span>Explore My Work</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="mailto:singh.mohak@outlook.com"
              className="group px-8 py-4 bg-dark-secondary/50 backdrop-blur-sm text-white rounded-lg font-medium border border-primary-teal/30 hover:border-primary-teal hover:bg-primary-teal/10 transition-all duration-300 hover:scale-105"
            >
              <svg className="mr-2 w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Get In Touch</span>
            </a>
          </motion.div>
          
          {/* Professional Links */}
          <motion.div 
            className="flex justify-center space-x-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            <a
              href="https://linkedin.com/in/mohak-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary-blue transition-colors duration-300 hover:scale-110 transform"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            <a
              href="https://github.com/mohak-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary-teal transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a
              href="https://kaggle.com/mohaksingh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-secondary-green transition-colors duration-300 hover:scale-110 transform"
              aria-label="Kaggle Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.493c0-.236.118-.353.354-.353h2.431c.234 0 .351.117.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.295"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.7 }}
      >
        <div className="flex flex-col items-center text-text-muted">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary-teal/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-teal rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
