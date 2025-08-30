import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: "AI/ML Frameworks",
      skills: ["PyTorch", "TensorFlow", "JAX", "Hugging Face", "OpenCV", "YOLO", "Detectron2", "CLIP", "LangChain", "LlamaIndex"]
    },
    {
      title: "MLOps & Cloud",
      skills: ["Docker", "Airflow", "MLflow", "AWS", "GCP", "Azure ML", "Kubernetes", "TensorRT"]
    },
    {
      title: "Big Data & Databases",
      skills: ["Spark", "Dask", "Ray", "Kafka", "PostgreSQL", "MongoDB", "Redis", "Apache Beam"]
    },
    {
      title: "Programming Languages",
      skills: ["Python", "C/C++", "SQL", "JavaScript", "TypeScript", "CUDA", "Shell Scripting"]
    },
    {
      title: "Specialized AI",
      skills: ["Transformer Models", "RL (PPO/DQN)", "GANs", "Diffusion Models", "Quantization", "Neural Architecture Search"]
    },
    {
      title: "Financial & Analytics",
      skills: ["Financial Time Series Analysis", "Statistical Modeling", "Quantitative Finance", "Risk Analytics"]
    }
  ];

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Expertise</h2>
          <div className="w-24 h-1 bg-primary-teal mx-auto mb-4"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Comprehensive technology stack spanning AI/ML, cloud infrastructure, and production systems
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="bg-dark-secondary/50 rounded-lg p-6 border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Title */}
              <h3 className="text-lg font-semibold text-primary-teal mb-4 border-b border-primary-teal/20 pb-2">
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1 bg-dark-tertiary/80 text-text-secondary text-sm rounded-full border border-dark-quaternary/50 hover:border-primary-teal/30 hover:text-primary-teal transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Specializations */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center text-white mb-8">Key Specializations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-dark-secondary/30 rounded-lg border border-primary-teal/20">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="text-primary-teal font-semibold mb-2">Deep Learning</h4>
              <p className="text-text-muted text-sm">Advanced neural architectures and training optimization</p>
            </div>
            
            <div className="text-center p-6 bg-dark-secondary/30 rounded-lg border border-secondary-green/20">
              <div className="text-3xl mb-3">👁️</div>
              <h4 className="text-secondary-green font-semibold mb-2">Computer Vision</h4>
              <p className="text-text-muted text-sm">Real-time image processing and analysis systems</p>
            </div>
            
            <div className="text-center p-6 bg-dark-secondary/30 rounded-lg border border-primary-blue/20">
              <div className="text-3xl mb-3">☁️</div>
              <h4 className="text-primary-blue font-semibold mb-2">MLOps</h4>
              <p className="text-text-muted text-sm">Production ML pipelines and infrastructure</p>
            </div>
            
            <div className="text-center p-6 bg-dark-secondary/30 rounded-lg border border-secondary-purple/20">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-secondary-purple font-semibold mb-2">Research</h4>
              <p className="text-text-muted text-sm">Cutting-edge AI research and innovation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
