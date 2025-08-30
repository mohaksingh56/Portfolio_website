import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-teal mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Professional Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-primary-teal mb-4">Professional Summary</h3>
            
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                AI/ML Engineer and Data Science Expert delivering transformer-powered, 
                real-time AI systems at global scale. With a proven track record in 
                leading elite teams and securing national hackathon victories.
              </p>
              
              <p>
                Published researcher and patent holder transforming research into 
                business impact. Specialized in building production-ready AI systems 
                that solve complex real-world problems across healthcare, energy, 
                and enterprise domains.
              </p>
              
              <p>
                Currently pursuing advanced research in transformer architectures, 
                neural architecture search, and distributed AI systems while 
                maintaining a focus on practical applications and business value.
              </p>
            </div>
          </motion.div>

          {/* Education & Key Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Education */}
            <div className="bg-dark-secondary/50 rounded-lg p-6 border border-primary-teal/20">
              <h4 className="text-xl font-semibold text-primary-teal mb-3">Education</h4>
              <div className="space-y-2">
                <div className="text-white font-medium">Bennett University</div>
                <div className="text-text-secondary">B.Tech Computer Science & Engineering</div>
                <div className="text-secondary-green font-medium">CGPA: 9.22/10 (Top 5%)</div>
              </div>
            </div>

            {/* Key Achievements Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-secondary/50 rounded-lg p-4 border border-primary-teal/20 text-center">
                <div className="text-2xl font-bold text-primary-teal mb-1">96.7%</div>
                <div className="text-sm text-text-muted">ASD Detection Accuracy</div>
              </div>
              
              <div className="bg-dark-secondary/50 rounded-lg p-4 border border-secondary-green/20 text-center">
                <div className="text-2xl font-bold text-secondary-green mb-1">90%</div>
                <div className="text-sm text-text-muted">Dev Time Reduction</div>
              </div>
              
              <div className="bg-dark-secondary/50 rounded-lg p-4 border border-primary-blue/20 text-center">
                <div className="text-2xl font-bold text-primary-blue mb-1">15ms</div>
                <div className="text-sm text-text-muted">Inference Latency</div>
              </div>
              
              <div className="bg-dark-secondary/50 rounded-lg p-4 border border-accent-amber/20 text-center">
                <div className="text-2xl font-bold text-accent-amber mb-1">#1</div>
                <div className="text-sm text-text-muted">National Champion</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Expertise Areas */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center text-white mb-8">Core Expertise</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-secondary/30 rounded-lg p-6 border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300">
              <div className="text-primary-teal text-3xl mb-4">🧠</div>
              <h4 className="text-lg font-semibold text-white mb-3">AI/ML Research</h4>
              <p className="text-text-secondary text-sm">
                Transformer architectures, neural networks, computer vision, and distributed AI systems
              </p>
            </div>
            
            <div className="bg-dark-secondary/30 rounded-lg p-6 border border-secondary-green/20 hover:border-secondary-green/40 transition-all duration-300">
              <div className="text-secondary-green text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold text-white mb-3">Production Systems</h4>
              <p className="text-text-secondary text-sm">
                MLOps, cloud deployment, real-time inference, and scalable AI infrastructure
              </p>
            </div>
            
            <div className="bg-dark-secondary/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue/40 transition-all duration-300">
              <div className="text-primary-blue text-3xl mb-4">📊</div>
              <h4 className="text-lg font-semibold text-white mb-3">Data Science</h4>
              <p className="text-text-secondary text-sm">
                Big data processing, statistical modeling, and business intelligence solutions
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
