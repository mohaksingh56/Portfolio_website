import React from 'react';
import { motion } from 'framer-motion';

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "Machine Learning Engineer Intern",
      company: "Lentit",
      period: "Mar 2025 – Jun 2025",
      achievements: [
        "Improved e-commerce demand forecasting accuracy by 18% using advanced time-series models",
        "Implemented MLflow & Prometheus monitoring pipelines for real-time model performance tracking",
        "Optimized PySpark workflows, reducing ETL processing time by 45%",
        "Deployed AWS Lambda ML microservices with sub-100ms response times"
      ],
      tech: ["Python", "PySpark", "MLflow", "AWS Lambda", "Prometheus"]
    },
    {
      title: "AI Research Engineer",
      company: "Bennett University AI Lab",
      period: "May 2024 – Apr 2025",
      achievements: [
        "Architected distributed transformer training infrastructure (4×A100 GPUs, 80% faster training)",
        "Built TensorRT-optimized inference system achieving 15ms latency for real-time applications",
        "Led multi-modal AI research resulting in 3 papers submitted to NeurIPS & ICML conferences"
      ],
      tech: ["PyTorch", "TensorRT", "CUDA", "Distributed Training", "Multi-modal AI"]
    }
  ];

  return (
    <section id="experience" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-primary-teal mx-auto"></div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-teal/30 transform md:-translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative mb-16 md:mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary-teal rounded-full transform md:-translate-x-1/2 border-4 border-dark-primary"></div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                <div className="bg-dark-secondary/50 rounded-lg p-6 border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <div className="text-primary-teal font-semibold mb-1">{exp.company}</div>
                    <div className="text-text-muted text-sm">{exp.period}</div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-text-secondary text-sm flex items-start">
                          <span className="text-secondary-green mr-2 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-teal/20 text-primary-teal text-xs rounded-full border border-primary-teal/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
