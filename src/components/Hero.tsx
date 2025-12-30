import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import profileData from '@/data/profile.json';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-muted/50 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow pt-20">
        <div className="space-y-8">
          {/* Greeting */}
          <p className="text-muted-foreground font-medium opacity-0 animate-fade-up">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight opacity-0 animate-fade-up stagger-1">
            {profileData.name}
          </h1>

          {/* Title */}
          <p className="text-2xl md:text-3xl text-muted-foreground font-light opacity-0 animate-fade-up stagger-2">
            {profileData.title}
          </p>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-up stagger-3">
            {profileData.tagline}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 pt-4 opacity-0 animate-fade-up stagger-4">
            {profileData.social.github && (
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            )}
            {profileData.social.linkedin && (
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            )}
            {profileData.social.twitter && (
              <a
                href={profileData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
