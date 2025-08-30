import React from 'react';
import { motion } from 'framer-motion';
import AdvancedHolographicCard from '../components/3d/AdvancedHolographicCard';
import DataFlowVisualization from '../components/3d/DataFlowVisualization';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "NeuroVision Transformer",
      description: "Medical AI Platform for ASD detection using advanced Vision Transformers",
      achievement: "96.7% accuracy",
      tech: ["PyTorch", "Vision Transformers", "Medical AI", "Computer Vision"],
      category: "Healthcare AI"
    },
    {
      title: "AutoML Studio",
      description: "Enterprise ML Platform with automated model selection and hyperparameter optimization",
      achievement: "90% dev time reduction",
      tech: ["AutoML", "MLOps", "Python", "Docker", "Kubernetes"],
      category: "MLOps Platform"
    },
    {
      title: "Learnify",
      description: "AI-powered Learning Platform with adaptive learning paths and personalized content",
      achievement: "Smart personalization",
      tech: ["LLMs", "Recommendation Systems", "React", "Node.js"],
      category: "EdTech AI"
    },
    {
      title: "GridAI",
      description: "Smart Energy Forecasting system for optimal power grid management",
      achievement: "94% accuracy",
      tech: ["Time Series", "LSTM", "TensorFlow", "Energy Analytics"],
      category: "Energy AI"
    },
    {
      title: "FitAI Pro",
      description: "CV-based Fitness Platform with real-time pose estimation and form correction",
      achievement: "99.2% pose accuracy",
      tech: ["OpenCV", "MediaPipe", "Computer Vision", "Real-time Processing"],
      category: "Fitness Tech"
    }
  ];

  return (
    <section id="projects" className="relative py-20 px-4">
      {/* Background Data Flow Visualization */}
      <div className="absolute inset-0 opacity-20">
        <DataFlowVisualization theme="neural" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Flagship Projects</h2>
          <div className="w-24 h-1 bg-primary-teal mx-auto mb-4"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Production-ready AI systems that solve real-world problems across multiple domains
          </p>
        </motion.div>

        {/* Advanced 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AdvancedHolographicCard
                title={project.title}
                description={project.description}
                achievement={project.achievement}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
