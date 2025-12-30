import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import profileData from '@/data/profile.json';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle geometric accents */}
      <div className="absolute top-20 right-0 w-px h-32 bg-border opacity-40" />
      <div className="absolute bottom-32 left-12 w-24 h-px bg-border opacity-40" />
      
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            {/* Small label */}
            <div className="flex items-center gap-3 opacity-0 animate-fade-up">
              <span className="w-8 h-px bg-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Portfolio
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] opacity-0 animate-fade-up stagger-1">
              {profileData.name}
            </h1>

            {/* Title with accent line */}
            <div className="flex items-center gap-4 opacity-0 animate-fade-up stagger-2">
              <span className="text-lg sm:text-xl text-muted-foreground font-light">
                {profileData.title}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-muted-foreground max-w-md leading-relaxed opacity-0 animate-fade-up stagger-3">
              {profileData.tagline}
            </p>

            {/* Social Links - horizontal with subtle dividers */}
            <div className="flex items-center gap-1 pt-4 opacity-0 animate-fade-up stagger-4">
              {profileData.social.github && (
                <>
                  <a
                    href={profileData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <span className="w-px h-4 bg-border" />
                </>
              )}
              {profileData.social.linkedin && (
                <>
                  <a
                    href={profileData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <span className="w-px h-4 bg-border" />
                </>
              )}
              {profileData.social.twitter && (
                <a
                  href={profileData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Right side - Profile Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 opacity-0 animate-fade-up stagger-2">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-border/50" />
              <div className="absolute -inset-8 border border-border/30 hidden sm:block" />
              
              {/* Photo container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-muted overflow-hidden">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Accent corner */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - repositioned */}
      <div className="absolute bottom-8 left-6 md:left-12 opacity-0 animate-fade-in stagger-5">
        <a
          href="#about"
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em]">Scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
