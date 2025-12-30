import { Github, Linkedin, Twitter, ArrowDown } from 'lucide-react';
import profileData from '@/data/profile.json';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-12 w-32 h-32 border border-primary/20 rounded-full opacity-40" />
      <div className="absolute bottom-1/3 left-8 w-20 h-20 border border-primary/15 rounded-full opacity-30" />
      <div className="absolute top-32 left-1/4 w-2 h-2 bg-primary/40 rounded-full" />
      <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-primary/30 rounded-full" />
      
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            {/* Small label */}
            <div className="flex items-center gap-3 opacity-0 animate-fade-up">
              <span className="section-divider" />
              <span className="section-label">
                Portfolio
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] opacity-0 animate-fade-up stagger-1">
              <span className="text-gradient-orange">{profileData.name.split(' ')[0]}</span>
              <br />
              <span>{profileData.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            {/* Title with accent */}
            <div className="flex items-center gap-4 opacity-0 animate-fade-up stagger-2">
              <span className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium border border-primary/20">
                {profileData.title}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed opacity-0 animate-fade-up stagger-3">
              {profileData.tagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2 opacity-0 animate-fade-up stagger-4">
              {profileData.social.github && (
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              )}
              {profileData.social.linkedin && (
                <a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              )}
              {profileData.social.twitter && (
                <a
                  href={profileData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  aria-label="Twitter"
                >
                  <Twitter size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Right side - Profile Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 opacity-0 animate-fade-up stagger-2">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-2xl rotate-3" />
              <div className="absolute -inset-8 border border-primary/10 rounded-3xl -rotate-2 hidden sm:block" />
              
              {/* Photo container */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-muted">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
                {/* Orange overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Accent dots */}
              <div className="absolute -bottom-4 -right-4 flex gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <div className="w-3 h-3 bg-primary/50 rounded-full" />
                <div className="w-3 h-3 bg-primary/25 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
