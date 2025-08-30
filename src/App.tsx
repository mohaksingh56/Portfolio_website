import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import AchievementsSection from './sections/AchievementsSection';
import ContactSection from './sections/ContactSection';
import StarField from './components/StarField';
import './index.css';

function App() {
  return (
    <div className="relative">
      {/* Consistent Star Field Background Throughout */}
      <StarField />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
