import React from 'react';
import { motion } from 'framer-motion';

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: "Smart India Hackathon – National Champion",
      year: "2024",
      description: "AI healthcare solution adopted by Ministry of Health",
      icon: "🏆",
      category: "National Competition"
    },
    {
      title: "Microsoft AI Challenge – Finalist",
      year: "2025",
      description: "GPT-powered enterprise assistant reaching top tier",
      icon: "🚀",
      category: "Tech Competition"
    },
    {
      title: "Google AI Fest – Youngest Finalist",
      year: "2023",
      description: "AI-driven environmental monitoring solution",
      icon: "🌟",
      category: "Research Competition"
    },
    {
      title: "Best Investor Pitch Award",
      year: "2024",
      description: "Strategic vision recognition for AI startup concept",
      icon: "💡",
      category: "Business Award"
    },
    {
      title: "Dean's List Award (2×)",
      year: "2023-2024",
      description: "Top 1% university ranking for academic excellence",
      icon: "🎓",
      category: "Academic Achievement"
    }
  ];

  return (
    <section id="achievements" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Achievements & Recognition</h2>
          <div className="w-24 h-1 bg-primary-teal mx-auto mb-4"></div>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Recognition for excellence in AI research, competition victories, and academic achievements
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-dark-secondary/50 rounded-lg p-6 border border-primary-teal/20 hover:border-primary-teal/40 transition-all duration-300 hover:transform hover:scale-105 h-full">
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <span className="px-3 py-1 bg-primary-teal/20 text-primary-teal text-xs rounded-full border border-primary-teal/30">
                    {achievement.category}
                  </span>
                </div>

                {/* Title & Year */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-teal transition-colors duration-300">
                  {achievement.title}
                </h3>
                
                <div className="text-secondary-green font-semibold text-sm mb-3">
                  {achievement.year}
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-teal mb-2">5+</div>
            <div className="text-text-muted text-sm">Major Awards</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-green mb-2">3</div>
            <div className="text-text-muted text-sm">Research Papers</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-blue mb-2">1st</div>
            <div className="text-text-muted text-sm">National Rank</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-amber mb-2">Top 5%</div>
            <div className="text-text-muted text-sm">Academic Standing</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
