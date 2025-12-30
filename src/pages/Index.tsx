import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle orange gradient accents */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-orange-soft)' }}
      />
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'var(--gradient-orange-accent)' }}
      />
      
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
